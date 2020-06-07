import fetch from 'isomorphic-unfetch'

export default async function (info: RequestInfo, init?: RequestInit) {
  const res = await fetch(info, init)
  return res.json()
}