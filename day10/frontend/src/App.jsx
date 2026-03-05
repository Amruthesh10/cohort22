import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { AuthProvider } from './features/auth/auth.context'
import { PostProvider } from './features/post/post.context'
import { FollowProvider } from './features/user/user.context'

const App = () => {
  return (
    <AuthProvider>
      <FollowProvider>
        <PostProvider>
          <RouterProvider router={router}/>
        </PostProvider>
      </FollowProvider>
    </AuthProvider>
  )
}

export default App