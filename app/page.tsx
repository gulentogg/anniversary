'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Clock, Sparkles, MapPin, Camera, Utensils, Video } from 'lucide-react';

// ข้อมูลรูปภาพและความทรงจำทั้ง 13 ช่วงเวลา (ดึงรูปตามลำดับ 1.jpg ถึง 13.jpg)
const memories = [
  {
    id: 1,
    title: 'อาทิตย์แรกที่เจอกัน',
    category: 'First Week',
    description: 'จุดเริ่มต้นความน่ารัก ท่าโพสน่ารักๆ ขี้เล่น และความรู้สึกดีๆ ที่เริ่มก่อตัว[cite: 1]',
    icon: Sparkles,
    tagColor: 'bg-pink-100 text-pink-700'
  },
  {
    id: 2,
    title: 'กินหมูกระทะก่อนปิดเทอม',
    category: 'Food & Dating',
    description: 'มื้ออร่อยยามค่ำคืน บรรยากาศก่อนแยกย้ายไปปิดเทอม[cite: 2]',
    icon: Utensils,
    tagColor: 'bg-orange-100 text-orange-700'
  },
  {
    id: 3,
    title: 'ตอนไปเที่ยวด้วยกัน',
    category: 'Travel',
    description: 'ช็อตเซลฟี่มุมกล้องคู่ชิดๆ เติมรอยยิ้มและความอบอุ่น[cite: 3]',
    icon: MapPin,
    tagColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: 4,
    title: 'ตอนไปทำผม',
    category: 'Daily Life',
    description: 'โมเมนต์ฮาๆ กวนๆ ตอนนั่งอบผมในร้านเสริมสวย[cite: 5]',
    icon: Camera,
    tagColor: 'bg-purple-100 text-purple-700'
  },
  {
    id: 5,
    title: 'เขาอีโต้ - รอยยิ้มริมน้ำ',
    category: 'Khao E-To',
    description: 'สัมผัสธรรมชาติ ยิ้มหวานๆ ข้างริมน้ำ[cite: 6]',
    icon: MapPin,
    tagColor: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 6,
    title: 'เขาอีโต้ - มุมเสยกับท้องฟ้า',
    category: 'Khao E-To',
    description: 'ท้าแดดและท้องฟ้าแจ่มใสกับแว่นกันแดดคู่ใจ[cite: 7]',
    icon: MapPin,
    tagColor: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 7,
    title: 'เขาอีโต้ - อ่างเก็บน้ำยามเย็น',
    category: 'Khao E-To',
    description: 'ชมวิวอ่างเก็บน้ำและทุ่งดอกหญ้าพลิ้วไหว[cite: 8]',
    icon: MapPin,
    tagColor: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 8,
    title: 'มนตราคาเฟ่ - ชูสองนิ้ว',
    category: 'Montra Cafe',
    description: 'กอดคอโพสท่าน่ารักน่าเอ็นดู[cite: 9]',
    icon: Sparkles,
    tagColor: 'bg-amber-100 text-amber-700'
  },
  {
    id: 9,
    title: 'มนตราคาเฟ่ - บันไดไม้',
    category: 'Montra Cafe',
    description: 'ยืนโพสบนบันไดไม้ ถือแก้วน้ำสดใส[cite: 10]',
    icon: Sparkles,
    tagColor: 'bg-amber-100 text-amber-700'
  },
  {
    id: 10,
    title: 'มนตราคาเฟ่ - นั่งชิลล์',
    category: 'Montra Cafe',
    description: 'นั่งรับลมเย็นๆ บรรยากาศคาเฟ่ร่มรื่น[cite: 11]',
    icon: Sparkles,
    tagColor: 'bg-amber-100 text-amber-700'
  },
  {
    id: 11,
    title: 'มนตราคาเฟ่ - รูปคู่สุดกวน',
    category: 'Montra Cafe',
    description: 'กอดคอเล่นหน้าเล่นตา น่ารักแบบฉุดไม่อยู่[cite: 12]',
    icon: Sparkles,
    tagColor: 'bg-amber-100 text-amber-700'
  },
  {
    id: 12,
    title: 'คอลหากันช่วงปิดเทอม',
    category: 'Long Distance',
    description: 'ตัวห่างไกลแต่ใจชิดกัน วิดีโอคอลเติมความคิดถึง[cite: 13]',
    icon: Video,
    tagColor: 'bg-rose-100 text-rose-700'
  },
  {
    id: 13,
    title: 'หมูกระทะเมื่อเดือนที่แล้ว',
    category: 'Food & Dating',
    description: 'ช็อตตะเกียบหนีบของกินเข้าปาก น่าเอ็นดูสุดๆ[cite: 14]',
    icon: Utensils,
    tagColor: 'bg-orange-100 text-orange-700'
  }
];

export default function AnniversaryPage() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 365,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // กำหนดวันคบกันเริ่มต้น (ปรับเปลี่ยนตามจริงได้เลยครับ)
    const startDate = new Date('2025-10-10T00:00:00');

    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeElapsed({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-red-50 text-gray-800 pb-20 font-sans">
      {/* Header / Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 text-center px-4">
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-10">
          <Heart className="w-[500px] h-[500px] text-rose-500 animate-pulse" />
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" /> Happy 1st Anniversary
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold text-rose-600 tracking-tight mb-4">
          Our 1st Year Together 💕
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto text-base md:text-lg mb-8">
          รวบรวม 13 ช่วงเวลาแห่งความทรงจำ จากวันแรกจนถึงวันนี้
        </p>

        {/* Counter Card */}
        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-rose-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-rose-500" /> อยู่ด้วยกันมาแล้ว
          </h2>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
              <span className="block text-2xl md:text-4xl font-bold text-rose-600">{timeElapsed.days}</span>
              <span className="text-xs text-gray-500">วัน</span>
            </div>
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
              <span className="block text-2xl md:text-4xl font-bold text-rose-600">{timeElapsed.hours}</span>
              <span className="text-xs text-gray-500">ชั่วโมง</span>
            </div>
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
              <span className="block text-2xl md:text-4xl font-bold text-rose-600">{timeElapsed.minutes}</span>
              <span className="text-xs text-gray-500">นาที</span>
            </div>
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
              <span className="block text-2xl md:text-4xl font-bold text-rose-600">{timeElapsed.seconds}</span>
              <span className="text-xs text-gray-500">วินาที</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery & Timeline Section */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
          <Calendar className="w-6 h-6 text-rose-500" /> Photo Timeline Memory
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-rose-100 flex flex-col transform hover:-translate-y-1"
              >
                {/* Photo Frame - ดึงรูปจาก /public/images/1.jpg ถึง 13.jpg */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden group">
                  <img
                    src={`${item.id}.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${item.tagColor}`}>
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="w-4 h-4 text-rose-500" />
                      <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                    <span>Memory #{item.id}</span>
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Special Ending Message Section */}
      <section className="max-w-3xl mx-auto px-4 mt-16 text-center">
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          
          <Heart className="w-12 h-12 text-white/80 mx-auto mb-6 animate-bounce" />
          
          <p className="text-xl md:text-3xl font-extrabold leading-relaxed tracking-wide mb-6">
            "กว่าจะเจอกันมันไม่ง่ายนะ เมื่อเจอกันแล้วเราก็อยู่กันมานานมากเลยนะเนี่ย เป้าหมายต่อไป 2 ปี!!!"
          </p>

          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium text-rose-100">
            Happy 1st Anniversary & Always & Forever ✨
          </div>
        </div>
      </section>
    </main>
  );
}