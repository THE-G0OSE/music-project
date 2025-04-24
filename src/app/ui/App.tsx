import { BrowserRouter, Route, Routes } from "react-router"
import { Layout } from "../../widgets/layout/ui/Layout"
import { Home } from "../../pages/home/ui/Home"
import { Library } from "../../pages/library/ui/Library"

export const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<Layout/>}>

          <Route index element={<Home/>}/>

          <Route path="/library" element={<Library/>}/>

        </Route>

      </Routes>

    </BrowserRouter>
  )
}
