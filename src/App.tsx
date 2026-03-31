/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Grid, User, Play, MoreHorizontal, ChevronLeft, Volume2, VolumeX, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type View = 'profile' | 'messages' | 'post';

export default function App() {
  const [view, setView] = useState<View>('profile');
  const [showStory, setShowStory] = useState(false);
  const [showHighlight, setShowHighlight] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicOn) {
        audioRef.current.play().catch(err => console.log("Audio playback failed:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicOn]);

  const posts = [
    { id: 1, img: "https://i.postimg.cc/8Cb8NZ0M/Kakao-Talk-20260331-075150521.png", caption: "오늘 날씨 너무 좋다... 🌸", likes: 1104, comments: ["너무 예뻐요!", "사진 너무 잘 찍었다", "봄이다!", "하나야 사랑해"] },
    { id: 3, img: "https://i.postimg.cc/Bv3WrrMJ/Kakao-Talk-20260331-075130369.png", caption: "메롱~", likes: 1300, comments: ["츄릅", "나도 기다려줄 수 있는데", "오빠 부럽다22", "귀여워ㅠㅠㅠㅠㅠ"] },
    { id: 6, img: "https://i.postimg.cc/bvRXpmBw/Kakao-Talk-20260331-075130369-01.png", caption: "🌙", likes: 802, comments: ["야경 죽인다", "초록사과는 지금이 제철입니다", "잠은 자야지", "화이팅!"] },
    { id: 10, img: "https://i.postimg.cc/5tJchhn6/Kakao-Talk-20260331-075130369-02.png", caption: "여름이다! ☀️", likes: 1542, comments: ["벌써 여름?", "시원해 보여요", "바다 가고 싶다", "하나야 예뻐"] },
    { id: 11, img: "https://i.postimg.cc/9fB3CLnD/Kakao-Talk-20260331-075130369-03.png", caption: "🌸", likes: 2103, comments: ["꽃보다 하나", "너무 화사해", "봄인가 여름인가", "예쁘다 진짜"] },
    { id: 12, img: "https://i.postimg.cc/QMqLhfyH/Kakao-Talk-20260331-075130369-04.png", caption: "오늘의 추천곡은 아크라포빅 🎵", likes: 3201, comments: ["노래 좋다", "취향 저격", "아크라포빅?", "오빠가 추천해준 거야?"] },
  ];

  const messages = [
    { sender: 'hana', text: '오빠! 오늘 저녁에 뭐 먹고 싶어? 내가 맛있는 거 해줄게! 🥰', time: '오후 4:30' },
    { sender: 'oppa', text: '글쎄, 그냥 간단하게 먹자. 너 힘들잖아.', time: '오후 4:32' },
    { sender: 'hana', text: '아냐! 같이 밥먹자. 하나도 안 힘들어! 오빠가 좋아하는 제육볶음 할까?', time: '오후 4:33' },
    { sender: 'oppa', text: '그래, 고마워 하나야.', time: '오후 4:35' },
    { sender: 'hana', text: '히히, 빨리 와 오빠! 보고 싶어... 🤍', time: '오후 4:36' },
    { sender: 'hana', text: '근데 오빠... 어제 어떤 여자랑 통화하던데, 누구야? 그냥 궁금해서! ☺️', time: '오후 5:10' },
  ];

  const renderProfile = () => (
    <>
      <div className="px-4 py-6 flex flex-col gap-4">
        <div className="flex items-center gap-8">
          <div className="relative cursor-pointer" onClick={() => setShowStory(true)}>
            <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-100">
                <img src="https://i.postimg.cc/R0Tr4gDY/Kakao-Talk-20260331-075221944.png" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 border-2 border-white">
              <Heart className="w-2 h-2 fill-current" />
            </div>
          </div>
          <div className="flex-1 flex justify-around text-center">
            <div>
              <div className="font-bold">{posts.length}</div>
              <div className="text-xs text-gray-500">게시물</div>
            </div>
            <div>
              <div className="font-bold">1.2k</div>
              <div className="text-xs text-gray-500">팔로워</div>
            </div>
            <div>
              <div className="font-bold">1</div>
              <div className="text-xs text-gray-500">팔로잉</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-bold text-sm">이하나 🌸</span>
          <span className="text-sm mt-1">👼🏻 🪽 🫧</span>
        </div>

        <div className="flex gap-2 mt-2">
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-1.5 rounded-lg text-sm font-semibold transition-colors">
            팔로잉
          </button>
          <button 
            onClick={() => setView('messages')}
            className="flex-1 bg-gray-100 hover:bg-gray-200 py-1.5 rounded-lg text-sm font-semibold transition-colors"
          >
            메시지
          </button>
        </div>
      </div>

      <div className="px-4 pb-4 flex gap-4 overflow-x-auto no-scrollbar">
        {['👶'].map((label, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center gap-1 shrink-0 cursor-pointer"
            onClick={() => setShowHighlight(i)}
          >
            <div className="w-14 h-14 rounded-full border border-gray-200 p-1">
              <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
                <img src="https://i.postimg.cc/tgb3FkCm/Kakao-Talk-20260331-212629826.jpg" alt={label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <span className="text-[10px]">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex border-t border-gray-100">
        <div className="flex-1 py-3 flex justify-center border-b-2 border-black">
          <Grid className="w-6 h-6" />
        </div>
        <div className="flex-1 py-3 flex justify-center text-gray-400">
          <Play className="w-6 h-6" />
        </div>
        <div className="flex-1 py-3 flex justify-center text-gray-400">
          <User className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-0.5 bg-gray-100">
        {posts.map((post) => (
          <div 
            key={post.id} 
            onClick={() => { setSelectedPost(post.id); setView('post'); }}
            className="aspect-square bg-white relative group cursor-pointer overflow-hidden"
          >
            <img src={post.img} alt={`Post ${post.id}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
          </div>
        ))}
      </div>
    </>
  );

  const renderMessages = () => (
    <div className="flex-1 flex flex-col bg-white h-full">
      <div className="px-4 py-3 flex items-center gap-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => setView('profile')} />
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
          <img src="https://i.postimg.cc/R0Tr4gDY/Kakao-Talk-20260331-075221944.png" alt="Hana" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm">이하나</span>
          <span className="text-[10px] text-green-500">현재 활동 중</span>
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.sender === 'hana' ? 'items-start' : 'items-end'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === 'hana' ? 'bg-white text-black rounded-tl-none' : 'bg-blue-500 text-white rounded-tr-none'}`}>
              {msg.text}
            </div>
            <span className="text-[9px] text-gray-400 mt-1">{msg.time}</span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-100 flex gap-3 items-center bg-white">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500">메시지 입력...</div>
        <Send className="w-5 h-5 text-blue-500" />
      </div>
    </div>
  );

  const renderPostDetail = () => {
    const post = posts.find(p => p.id === selectedPost);
    if (!post) return null;
    return (
      <div className="flex-1 flex flex-col bg-white overflow-y-auto h-full">
        <div className="px-4 py-3 flex items-center gap-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => setView('profile')} />
          <span className="font-bold text-sm">게시물</span>
        </div>
        <div className="flex items-center gap-3 p-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
            <img src="https://i.postimg.cc/R0Tr4gDY/Kakao-Talk-20260331-075221944.png" alt="Hana" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <span className="font-bold text-sm">hana_sweet_03</span>
        </div>
        <div className="aspect-square bg-gray-100">
          <img src={post.img} alt="Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="p-3 flex flex-col gap-2">
          <div className="flex gap-4">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <MessageCircle className="w-6 h-6" />
            <Send className="w-6 h-6" />
            <div className="flex-1" />
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="text-sm font-bold">좋아요 {post.likes}개</div>
          <div className="text-sm">
            <span className="font-bold mr-2">hana_sweet_03</span>
            {post.caption}
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-gray-50 pt-4">
            {post.comments.map((comment, i) => (
              <div key={i} className="text-sm flex gap-2">
                <span className="font-bold shrink-0">user_{100 + i * 12}</span>
                <span className="text-gray-700">{comment}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white shadow-2xl flex flex-col relative h-full">
        {/* Header with MP3 Toggle */}
        {view === 'profile' && (
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50 bg-white z-20">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">hana_sweet_03</span>
            </div>
            <div className="flex gap-4 items-center">
              <button 
                onClick={() => setIsMusicOn(!isMusicOn)}
                className={`p-2 rounded-full transition-all duration-300 ${isMusicOn ? 'bg-pink-100 text-pink-600 scale-110' : 'bg-gray-100 text-gray-400'}`}
              >
                {isMusicOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <MoreHorizontal className="w-6 h-6" />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
          {view === 'profile' && renderProfile()}
          {view === 'messages' && renderMessages()}
          {view === 'post' && renderPostDetail()}
        </div>

        <audio 
          ref={audioRef} 
          src="https://raw.githubusercontent.com/W4vy0/mysecretdiary/main/bgm.mp3" 
          loop 
        />

        {/* Story Overlay */}
        <AnimatePresence>
          {showStory && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] bg-black flex flex-col"
            >
              <div className="p-4 flex items-center justify-between text-white z-20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                    <img src="https://i.postimg.cc/R0Tr4gDY/Kakao-Talk-20260331-075221944.png" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-bold text-sm">hana_sweet_03</span>
                </div>
                <button onClick={() => setShowStory(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 relative flex items-center justify-center p-4 z-10">
                <div className="w-full max-w-sm aspect-[9/16] bg-gray-900 rounded-3xl overflow-hidden relative shadow-2xl border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-0" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center z-10">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-24 h-24 rounded-full border-4 border-pink-500 p-1 mb-6 shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                    >
                      <img src="https://i.postimg.cc/R0Tr4gDY/Kakao-Talk-20260331-075221944.png" alt="Profile" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                    </motion.div>
                    <motion.h2 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl font-bold mb-4 italic text-pink-300 tracking-tight"
                    >
                      About Me 🎀
                    </motion.h2>
                    <div className="space-y-2 w-full">
                      {[
                        { k: '이름', v: '이하나 (20세)' },
                        { k: '키', v: '158cm' },
                        { k: '성격', v: 'ESFJ' },
                        { k: '취미', v: '오빠 관찰하기...🤍' },
                        { k: '비밀', v: '뭐야? 그게 왜 궁금해?' }
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 flex justify-between items-center text-xs shadow-lg"
                        >
                          <span className="text-pink-300 font-bold">{item.k}</span>
                          <span className="font-medium">{item.v}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Highlight View Overlay */}
        <AnimatePresence>
          {showHighlight !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1100] bg-black/95 flex flex-col items-center justify-center p-4"
              onClick={() => setShowHighlight(null)}
            >
              <button 
                className="absolute top-4 right-4 text-white p-2 bg-white/10 rounded-full"
                onClick={() => setShowHighlight(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-sm aspect-square bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src="https://i.postimg.cc/tgb3FkCm/Kakao-Talk-20260331-212629826.jpg" 
                  alt="Highlight" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
              </motion.div>
              <div className="mt-4 text-white font-bold text-lg">
                {['👶'][showHighlight]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
