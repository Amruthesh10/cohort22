import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { AuthProvider } from './features/auth/auth.context'
import { PostProvider } from './features/post/post.context'

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>

    <RouterProvider router={router}/>
      </PostProvider>
    </AuthProvider>
  )
}

export default App