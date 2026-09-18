"use client";

import Link from "next/link";

export default function ForbiddenPage(){

return(

<div
className="
flex
min-h-screen
items-center
justify-center
bg-slate-950
text-white
"
>

<div className="text-center">

<h1
className="
text-8xl
font-black
text-blue-500
"
>

403

</h1>

<p className="mt-4">

Anda tidak memiliki akses.

</p>

<Link
href="/"
className="
mt-8
inline-block
rounded-xl
bg-blue-600
px-6
py-3
"
>

Kembali

</Link>

</div>

</div>

);

}