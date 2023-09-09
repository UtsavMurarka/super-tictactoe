import Link from 'next/link'

export default function login() {
    const handleClick = ()=> {
        console.log("click")
    }
    return (

        <div>
            <button onClick={handleClick}>hehe</button>
            <h1><Link href='/welcome'>welcome page</Link></h1>
        </div>
    )
}