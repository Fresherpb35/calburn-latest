import React from "react";
import { Shield, Award, Target, Zap } from "lucide-react";
import SectionTitle from "../common/SectionTitle";

const VALUES = [
  { icon: Shield, title: "Truthful", body: "Always Be Truthful And Honest In Every Aspect Of Business.",          color: "#f97316" },
  { icon: Award,  title: "Give Back",body: "Give Back To The People To Whom You Owe Your Success.",                color: "#ea580c" },
  { icon: Target, title: "Goal",     body: "It's Our Goal To Make The Big Idea Bigger.",                           color: "#f97316" },
  { icon: Zap,    title: "Mission",  body: 'Our Mission Is Not Complete Until The Customer Says "Wow".',          color: "#ea580c" },
];

export default function ValuesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="The Core Values Unite And Remind Us What Is Important"
          heading="It's Time For A Pure Workout"
          center
          className="reveal"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`reveal delay-${i * 100} bg-white rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: v.color }}
              >
                <v.icon size={24} className="text-white" />
              </div>
              <h3 className="font-display text-2xl text-dark-900 mb-2">{v.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
