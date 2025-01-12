import jwt from 'jsonwebtoken'

export const userTExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
        
    let token = ''
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.substring(7)
    }
    let decodedToken = {}
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)            
    } catch (error) {
        console.log(error)
    }
      
    if (!token || !decodedToken.rol || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    req.rol = decodedToken.rol

    next()
}