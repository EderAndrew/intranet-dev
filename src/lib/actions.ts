'use server'
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)
export const encrypt = async(payload: any) => {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('10m')
        .sign(key)
}
export const decrypt = async(input: string) => {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256']
    })
    return payload
}
export const getSession = async () => {
    const session = cookies().get('session')?.value
    if(!session) return null
    return await decrypt(session)
}

export const updateSession = async(request: NextRequest) => {
    const session = request.cookies.get('session')?.value
    if(!session) return

    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now() + 1000 * 1000)
    const res = NextResponse.next()
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires as number
    })
    return res
}

export const login = async(formData: any) => {
    try{
        let { useremail, userpassword } = formData
        if(useremail === "jhon.doe@example.com" && userpassword === "12345678") {
            const user = {email: useremail, password: userpassword}
        
            const expires = new Date(Date.now() + 1000 * 1000)
            const session = await encrypt({ user, expires })

            cookies().set('session', session, {expires, httpOnly: true})
            return true
        }else{
            return false
        }
        
    }catch(e){
        if(e instanceof Error){
            console.log(e.message)
        }
    }
}

export const logout = async() => {
    cookies().set('session', '', { expires: new Date(0) })
}