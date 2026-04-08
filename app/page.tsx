import Link from 'next/link'
import { TransitionLink } from './components/TransitionLink'
import BlinkingCursor from './components/BlinkingCursor'

export default function Home() {
    return (
        <div className="flex flex-col gap-8 tui-enter">
            <pre className="hidden md:block text-sm leading-tight whitespace-pre overflow-x-auto">
{`  __                                                     _
 / _|_ __ __ _ _ __   ___ ___  ___  ___ ___  _ __   ___| |_   _ ___  ___
| |_| '__/ _\` | '_ \\ / __/ _ \\/ __|/ __/ _ \\| '_ \\ / _ \\ | | | / __|/ _ \\
|  _| | | (_| | | | | (_|  __/\\__ \\ (_| (_) | |_) |  __/ | |_| \\__ \\ (_) |
|_| |_|  \\__,_|_| |_|\\___\\___||___/\\___\\___/| .__/ \\___|_|\\__,_|___/\\___/
                                            |_|`}
            </pre>
            <h1 className="md:hidden text-lg font-bold">$ francescopeluso</h1>

            <div className="flex flex-col gap-1">
                <p className="text-sm">$ whoami</p>
                <p className="text-sm">Computer Engineering Student &amp; Full Stack Developer</p>
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-sm">$ ls ./pages/<BlinkingCursor /></p>
                <nav className="flex flex-wrap gap-3 mt-2">
                    <TransitionLink href="/about" className="border border-white px-4 py-1 text-sm hover:bg-white hover:text-black">[about]</TransitionLink>
                    <TransitionLink href="/projects" className="border border-white px-4 py-1 text-sm hover:bg-white hover:text-black">[projects]</TransitionLink>
                    <TransitionLink href="/blog" className="border border-white px-4 py-1 text-sm hover:bg-white hover:text-black">[blog]</TransitionLink>
                    <TransitionLink href="/contacts" className="border border-white px-4 py-1 text-sm hover:bg-white hover:text-black">[contacts]</TransitionLink>
                </nav>
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-sm">$ ls ./links/<BlinkingCursor /></p>
                <div className="flex flex-wrap gap-3 mt-2">
                    <Link href="https://github.com/francescopeluso" target="_blank" className="border border-white px-3 py-1 text-sm hover:bg-white hover:text-black">[github]</Link>
                    <Link href="https://linkedin.com/in/francescopeluso04" target="_blank" className="border border-white px-3 py-1 text-sm hover:bg-white hover:text-black">[linkedin]</Link>
                    <Link href="https://reddit.com/u/ThatsFrankie" target="_blank" className="border border-white px-3 py-1 text-sm hover:bg-white hover:text-black">[reddit]</Link>
                    <Link href="https://drive.google.com/file/d/1Z8OG1Du7OYnhpZW9pyCHdMU8PPHt17kM/view?usp=sharing" target="_blank" className="border border-white px-3 py-1 text-sm hover:bg-white hover:text-black">[resume]</Link>
                </div>
            </div>
        </div>
    )
}
