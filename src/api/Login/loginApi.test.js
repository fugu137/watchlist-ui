import axios from 'axios'
import LoginApi from './loginApi'

jest.mock('axios')

describe('LoginApi', () => {
  describe('login', () => {
    const username = 'username'
    const password = 'password'

    it('calls backend with correct credentials', async () => {
      const url = '/login'

      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      axios.post.mockResolvedValueOnce({ status: 200 })
      await LoginApi.login(username, password)

      expect(axios.post).toHaveBeenCalledWith(url, formData)
    })

    it('returns correct response if login credentials are correct', async () => {
      const expectedResponse = {
        loggedIn: true,
        error: null,
      }

      axios.post.mockResolvedValueOnce({ status: 200 })
      const response = await LoginApi.login(username, password)

      expect(response).toStrictEqual(expectedResponse)
    })

    it('returns correct response if login credentials are incorrect', async () => {
      const expectedResponse = {
        error:
          'Invalid login details. Please check your username and password and try again.',
      }

      axios.post.mockRejectedValue({ response: { status: 401 } })
      const response = await LoginApi.login(username, password)

      expect(response).toStrictEqual(expectedResponse)
    })

    it('returns correct response if server unavailable', async () => {
      const expectedResponse = {
        error: 'The server is unavailable. Please try again later.',
      }

      axios.post.mockRejectedValue(new Error())
      const response = await LoginApi.login(username, password)

      expect(response).toStrictEqual(expectedResponse)
    })
  })

  describe('logout', () => {
    it('makes call to correct backend endpoint', async () => {
      const url = '/logout'

      axios.post.mockResolvedValueOnce({ status: 200 })
      await LoginApi.logout()

      expect(axios.post).toHaveBeenCalledWith(url)
    })

    it('returns correct response if logout successful', async () => {
      const expectedResponse = {
        loggedIn: false,
        error: null,
      }

      axios.post.mockResolvedValueOnce({ status: 200 })
      const response = await LoginApi.logout()

      expect(response).toStrictEqual(expectedResponse)
    })

    it('returns correct response if logout not successful', async () => {
      const expectedResponse = {
        error: 'Server unavailable. Unable to log out. Please try again later.',
      }

      axios.post.mockRejectedValue({ response: { status: 500 } })
      const response = await LoginApi.logout()

      expect(response).toStrictEqual(expectedResponse)
    })
  })
})
