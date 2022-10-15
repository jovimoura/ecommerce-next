import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    // when user is not authenticated
    signIn: '/',
    // if error:
    error: '/'
  }
})