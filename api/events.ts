import type { Show } from '../interfaces/show'
import type { APIErrorResponse } from '../interfaces/api'
import testApi from './config/testapi'

export const getEvents = async (): Promise<{
  data: Show[] | null
  error: APIErrorResponse | null
  status: boolean
}> => {
  try {
    const response = await testApi.get('/shows')
    return {
      data: response.data,
      error: null,
      status: true,
    }
  } catch (err) {
    console.error(err)
    return {
      data: null,
      error: handleResponseFailure(err),
      status: false,
    }
  }
}

export const getEventDetail = async (id: string): Promise<{
  data: Show | null
  error: APIErrorResponse | null
  status: boolean
}> => {
  try {
    const response = await testApi.get(`/shows/${id}`)
    return {
      data: response.data,
      error: null,
      status: true,
    }
  } catch (err) {
    console.error(err)
    return {
      data: null,
      error: handleResponseFailure(err),
      status: false,
    }
  }
}