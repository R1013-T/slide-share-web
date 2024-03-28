import Nav from '@/components/common/nav'
import WeekSlideList from '@/components/slide/week_slide_list'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SpeakerList } from '@/components/user/speaker/speaker_list'

import CardWrapper from './_components/card-wrapper'
import Info from './_components/info'

export default async function Home() {
  return (
    <main>
      <Nav />
      <ScrollArea className="h-dvh px-4">
        <div className="flex flex-col gap-3 pt-12 pb-24 px-1">
          <CardWrapper
            title="TECH.C. LTサークルへようこそ 👋"
            description="興味がある方は、お気軽にお問い合わせください！"
            link={{
              href: '/contacts',
              text: 'お問い合わせ',
            }}
          >
            <Info />
          </CardWrapper>
          <CardWrapper title="発表者一覧">
            <SpeakerList />
          </CardWrapper>
          <CardWrapper
            title="新着LT"
            link={{
              href: '/slides?page=1',
              text: 'すべてのLTを見る',
            }}
          >
            <WeekSlideList />
          </CardWrapper>
        </div>
      </ScrollArea>
    </main>
  )
}
