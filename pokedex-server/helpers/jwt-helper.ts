const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client = require('./init_redis')

const jwtHelper = {
  signAccessToken: (userId: string) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = process.env.ACCESS_TOKEN_SECRET
      const options = {
        expiresIn: '1h',
        issuer: 'jojo-pokedex',
        audience: userId,
      }
      JWT.sign(payload, secret, options, (err: any, token: any) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
          return
        }
        resolve(token)
      })
    })
  },
  signRefreshToken: (userId: string) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = process.env.REFRESH_TOKEN_SECRET
      const options = {
        expiresIn: '1y',
        issuer: 'pickurpage.com',
        audience: userId,
      }
      JWT.sign(payload, secret, options, (err: any, token: any) => {
        if (err) {
          console.log(err.message)
          // reject(err)
          reject(createError.InternalServerError())
        }

        client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err: any, reply: any) => {
          if (err) {
            console.log(err.message)
            reject(createError.InternalServerError())
            return
          }
          resolve(token)
        })
      })
    })
  },
  verifyRefreshToken: (refreshToken: string) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err: any, payload: any) => {
          if (err) return reject(createError.Unauthorized())
          const userId = payload.aud
          client.GET(userId, (err: any, result: any) => {
            if (err) {
              console.log(err.message)
              reject(createError.InternalServerError())
              return
            }
            if (refreshToken === result) return resolve(userId)
            reject(createError.Unauthorized())
          })
        }
      )
    })
  },
}

export default jwtHelper;