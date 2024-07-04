import { updateSession } from '@/lib/actions'
import { NextResponse, type NextRequest } from 'next/server'


export const middleware = async (request: NextRequest) => {
    try{
        const currentSession = request.cookies.get('session')?.value
        if(currentSession && !request.nextUrl.pathname.startsWith('/home')) return NextResponse.redirect(new URL('/home', request.url))
        if(!currentSession && !request.nextUrl.pathname.startsWith('/login')) return NextResponse.redirect(new URL('/login', request.url))
        return await updateSession(request)
    }catch(e){
        console.log(e)
    }
}

export const config = {
    matcher:['/home/:path*']
}