import Link from 'next/link'

export default function welcome() {
    return (
        <div>
            <h1><Link href='/login'>login page</Link></h1>
        </div>
    )
}