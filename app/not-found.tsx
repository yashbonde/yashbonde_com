import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6">
            <div className="max-w-xl w-full text-center">
                <div className="mb-4 flex justify-center">
                    <Image
                        src="https://ndotovhaihcfvwintgpc.supabase.co/storage/v1/object/public/yashbonde/images/404.webp"
                        alt="404 - Not Found"
                        width={512}
                        height={512}
                        className="rounded-lg max-w-full h-auto"
                        priority
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-serif font-bold text-ink mb-2">Are you lost?</h1>
                    <Link href="/" className="text-base" prefetch={false}>
                        Go home
                    </Link>
                </div>
            </div>
        </div>
    );
}

