import { Menu } from 'lucide-react';
import LoginButton from "./loginButton";
import { Button } from "./ui/button";
import Link from 'next/link';

export default function Header(){
    return (
        <header className="h-16 w-full flex justify-center bg-white bg-opacity-50 absolute top-0 border-b">
            <div className="max-w-screen-xl flex-1 justify-between mx-4 py-4 grid grid-cols-3 sm:grid-cols-2 items-center ">
                <Button size="sm" variant="ghost" className='sm:hidden block aspect-square'><Menu /></Button>
                <Link href="/" className='font-semibold text-2xl text-center sm:text-left whitespace-nowrap mx-4'>News Butler</Link>
                <div className='flex justify-end space-x-8'>
                    <div className='hidden sm:flex space-x-8'>
                        <Button variant="link" size="sm" className='p-0'><Link href="">About</Link></Button>
                        <Button variant="link" size="sm" className='p-0'><Link href="">Contact Us</Link></Button>
                    </div>
                    <LoginButton />
                </div>
            </div>
        </header>
    )
}