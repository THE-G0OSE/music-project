import { useNavigate, useParams } from "react-router";
import { IMusic } from "../../../shared/mocks/musicMock";
import {
  comment,
  CommentsList,
} from "../../../widgets/commentsList/ui/CommentsList";
import { useEffect, useRef, useState } from "react";
import { musicSlice } from "../../../app/store/musicSlice";
import { BiPlayCircle } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { userSlice } from "../../../app/store/userSlice";
import { currentMusicSlice } from "../../../app/store/currentMusicSlice";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { api } from "../../../shared/configs/apiPath";

export const MusicPage = () => {
  const { musicId } = useParams();
  const musicSl = musicSlice();
  const { user, addLiked, removeLiked } = userSlice();
  const currentMusic = currentMusicSlice();
  const [music, setMusic] = useState<IMusic | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const [comments, setComments] = useState<comment[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchMusic = async () => {
      try {
        setLoading(true);

        const res = await musicSl.fetchOneMusic(musicId!);

        if (isMounted && res) {
          setMusic({
            title: res.title,
            author: res.author,
            cover_image: res.cover_image,
            path: res.path,
            ID: res.ID,
            username: res.username,
            comments: res.comments,
          });
        }
      } catch (err) {
        if (isMounted) {
          alert(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMusic();

    return () => {
      isMounted = false;
    };
  }, [musicId, musicSl]);
  const fetchComments = async (isMounted: boolean) => {
    const res = await fetch(api + "comments/music/" + music!.ID, {referrerPolicy: "no-referrer"});
    const body = await res.json();
    if (res.ok && isMounted) {
      if (body.comments == null) {
        setComments([]);
      } else {
        setComments(body.comments);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (music) {
      fetchComments(isMounted);
    }
    return () => {
      isMounted = false;
    };
  }, [music]);

  const deleteButtonClickHandler = () => {
    const deleteFetch = async () => {
      const res = await fetch(api + "media/delete/" + music!.ID, {
        referrerPolicy: 'no-referrer',
        method: "DELETE",
      });
      if (!res.ok) {
        alert("something went wrong");
      }
    };
    deleteFetch();
    setTimeout(() => {navigate("/library")}, 200);
  };

  const likeButtonClickHandler = () => {
    if (!user!.likes.includes(String(music!.ID))) {
      const like = async () => {
        const res = await fetch(
          api + "media/like/" + music!.ID + "/" + user!.username,
          { method: "PUT", referrerPolicy: 'no-referrer' }
        );
        if (!res.ok) {
          alert("something went wrong");
        } else {
          addLiked(String(music!.ID));
        }
      };
      like();
    } else {
      const unlike = async () => {
        const res = await fetch(
          api + "media/unlike/" + music!.ID + "/" + user!.username,
          { method: "PUT", referrerPolicy: 'no-referrer' }
        );
        if (!res.ok) {
          alert("something went wrong");
        } else {
          removeLiked(String(music!.ID));
        }
      };
      unlike();
    }
  };

  const playButtonClickHandler = () => {
    currentMusic.setMusic(music!);
  };
  const postComment = async (comment:{content: string; username: string; music_id: string}) => {
    const res = await fetch(api + "comments", {
      method: "POST",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const body = await res.json();
    if (!res.ok) {
      alert(body.error);
    }
  };

  const submitHandler = () => {
    const commentValue = commentRef.current!.value;
    const comment = {
      content: commentValue,
      username: user!.username,
      music_id: String(music!.ID),
    };
    postComment(comment);
    console.log(comment);
    commentRef.current!.value = "";
    setTimeout(() => fetchComments(true), 100);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-full w-full text-green-500 text-[2rem] font-bold">
        Загрузка...
      </div>
    );

  if (music)
    return (
      <div className="flex overflow-scroll h-[calc(100vh+500px)] md:h-[calc(100vh+440px)] flex-col w-full px-8 md:px-0 md:pr-8 items-center">
        <div className="flex w-full justify-around items-center">
          <button
            onClick={playButtonClickHandler}
            className="text-[8rem] text-green-500"
          >
            <BiPlayCircle />
          </button>
          <div className="size-60 rounded-2xl shrink-0 overflow-hidden">
            <img
              className="size-full object-cover"
              src={api + music.cover_image}
            />
          </div>
          {music.username === user?.username ? (
            <button
              onClick={deleteButtonClickHandler}
              className="text-[6rem] text-red-500 "
            >
              <FaTrashCan />
            </button>
          ) : (
            user && (
              <button
                onClick={likeButtonClickHandler}
                className="text-[8rem] text-red-500"
              >
                {user.likes.includes(String(music!.ID)) ? (
                  <BsHeartFill />
                ) : (
                  <BsHeart />
                )}
              </button>
            )
          )}
        </div>
        <p className="text-[1.6rem] mt-3 font-bold">{music.title}</p>
        <p className="text-[1.4rem] text-slate-400">{music.author}</p>
        <div className="h-screen md:pl-8 overflow-scroll">
          {comments && <CommentsList comments={comments} />}
          <textarea
            ref={commentRef}
            placeholder="Напишите свой комментарий"
            className="w-[calc(100%-64px)] md:w-[calc(100%-32px)] md:ml-0 outline-none py-2 px-4 rounded-2xl mt-9 ml-8 min-h-30 bg-slate-100"
          />
          <button
            onClick={submitHandler}
            className="w-[calc(100%-64px)] md:w-[calc(100%-32px)] mt-4 md:ml-0 ml-8 text-white rounded-full h-10 bg-green-500"
          >
            Написать
          </button>
        </div>
      </div>
    );
};
