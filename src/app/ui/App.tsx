import { BrowserRouter, Route, Routes } from "react-router"
import { Layout } from "../../widgets/layout/ui/Layout"
import { Home } from "../../pages/home/ui/Home"
import { Library } from "../../pages/library/ui/Library"
import { Profile } from "../../pages/profile/ui/Profile"
import { MusicPage } from "../../pages/music/ui/MusicPage"

export const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<Layout/>}>

          <Route index element={<Home/>}/>

          <Route path="/library" element={<Library/>}/>

          <Route path="/profile" element={<Profile/>}/>

          <Route path='/music/:musicId' element={<MusicPage/>}/>

        </Route>

      </Routes>

    </BrowserRouter>
  )
}
