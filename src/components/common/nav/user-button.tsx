import { Speech } from 'lucide-react'
import Link from 'next/link'

import { ThemeToggle } from '@/components/theme/toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import SpeakerInfoDialog from '@/components/user/speaker/speaker_info_dialog'
import { cn } from '@/lib/utils'
import type { User } from '@/types/user'

import { auth } from '../../../../auth'
import SignOutButton from './sign-out-button'

export default async function UserButton() {
  const session = await auth()
  const user = session?.user
  const isMember = user?.role === 'speaker' || user?.role === 'admin'

  return (
    <div className="h-8">
      {user ? (
        <Popover>
          <PopoverTrigger>
            <Avatar className="w-9 h-9 ml-1">
              <AvatarImage src={user.image!} />
              <AvatarFallback>{user.display_name![0]}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="mb-3 py-2 px-1.5 flex flex-col gap-1">
            <div className="px-2">
              <div className="flex justify-between">
                <p className="text-foreground">{user.display_name}</p>
                <div className="flex gap-2">
                  <ThemeToggle />
                  {user.role != 'user' && (
                    <Badge>{user.role == 'admin' ? '管理者' : '発表者'}</Badge>
                  )}
                </div>
              </div>
              {user.role != 'user' && (
                <>
                  <p className="text-sm mt-0.5 mb-1">
                    <span className="mr-0.5 text-xs">@</span>
                    {user.speaker_id}
                  </p>
                  <p className="text-sm">
                    {user.school} <span className="mx-0.5 text-xs">/</span>
                    {user.course}
                  </p>
                </>
              )}
              <p className="text-xs mt-1">{user.email}</p>
            </div>
            <div className="mt-2">
              <Separator />
            </div>
            {isMember && (
              <>
                <SpeakerInfoDialog user={user as User} />
                <Separator />
                <Link
                  href={`/speakers/${user.speaker_id}`}
                  className="text-sm w-full flex gap-1 justify-start items-center my-0.5 p-1.5 pl-2 rounded transition-colors hover:text-foreground hover:bg-black/10 hover:dark:bg-white/10"
                >
                  <Speech className="w-5 h-5" />
                  発表者ページを見る
                </Link>
                <Separator />
              </>
            )}
            <SignOutButton />
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          href="/auth"
          className={cn(buttonVariants(), 'rounded-full h-9 ml-1')}
        >
          ログイン
        </Link>
      )}
    </div>
  )
}
