'use client'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { LogOut, User } from 'lucide-react'
import { logout } from '@/lib/actions'
import { useRouter } from 'next/navigation'

export const Header = () => {
    const router = useRouter()
  const logoutUser = () => {
    logout()
    router.push('/home')
  }
  return (
    <header className='w-full h-16 border-b-2 border-slate-100 flex justify-center'>
        <div className="w-[80%] flex justify-between">
            <div className="content-center">
                <span className="font-bold text-2xl text-slate-800">Intranet - Dev</span>
            </div>
            <div className="content-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <p>Usuário</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span onClick={logoutUser}>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </header>
  )
}

