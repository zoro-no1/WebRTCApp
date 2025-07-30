import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sender from "@/utils/Sender";
import { motion } from "framer-motion";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

// Features for the section below hero
const features = [
  {
    icon: <VideoCameraIcon className="h-8 w-8 text-indigo-500" />,
    title: "High-Quality Calls",
    description: "Crystal clear audio and video with adaptive streaming.",
  },
  {
    icon: <VideoCameraIcon className="h-8 w-8 text-green-500" />,
    title: "No Sign-Up Required",
    description: "Jump into meetings instantly—no hassles, no accounts needed.",
  },
  {
    icon: <VideoCameraIcon className="h-8 w-8 text-pink-500" />,
    title: "Multi-Device Ready",
    description: "Works smoothly across desktop, tablet, and mobile.",
  },
];

// Footer links
const footerLinks = [
  { label: "Privacy Policy", url: "#" },
  { label: "Terms of Service", url: "#" },
  { label: "Contact", url: "#" },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [name, setMyName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const { setName } = Sender();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      setName(name);
      navigate(room ? `/room/${room}` : "/dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-blue-50 via-indigo-100 to-purple-50">
      {/* GLASSY ANIMATED HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, type: "spring" }}
        className="sticky top-0 z-40 w-full bg-white/60 backdrop-blur-lg shadow-sm border-b border-indigo-100"
      >
        <div className="max-w-6xl mx-auto flex items-center gap-3 py-4 px-6">
          <VideoCameraIcon className="h-9 w-9 text-indigo-600" />
          <span className="font-black text-2xl text-indigo-700 tracking-tight drop-shadow">Connectly</span>
          <motion.span
            className="ml-3 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-600 shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            Effortless video calls
          </motion.span>
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <motion.section 
        id="hero-form"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-full flex flex-col items-center mt-16"
      >
        <motion.div
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl px-10 py-9 max-w-lg text-center border mb-10"
        >
          <div className="flex justify-center mb-4">
            <VideoCameraIcon className="h-12 w-12 text-indigo-600 animate-pulse" />
          </div>
          <h1 className="text-4xl font-extrabold mb-3 text-gray-900">Connectly Video Calls</h1>
          <p className="text-gray-700 text-lg mb-7">
            Connect face-to-face, instantly.<br/>
            <span className="bg-indigo-100 rounded px-2 py-0.5 text-indigo-600 font-medium">No downloads or signups required.</span>
          </p>
          <form className="flex flex-col gap-3 items-center" onSubmit={handleSubmit}>
            <Input 
              className="bg-white focus:ring-2 focus:ring-indigo-300 transition w-60"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setMyName(e.target.value)}
              required
            />
            <Input 
              className="bg-white focus:ring-2 focus:ring-pink-300 transition w-60"
              type="text"
              placeholder="Room Name (optional)"
              value={room}
              onChange={e => setRoom(e.target.value)}
            />
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button
                type="submit"
                variant="default"
                className="w-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow"
              >
                {room ? "Join Room" : "Explore Dashboard"}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.section>

      {/* FEATURES SECTION */}
      <motion.section
        id="features"
        className="max-w-4xl w-full mx-auto mb-10 px-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 48 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
              className="bg-white/80 border rounded-lg flex flex-col items-center p-6 shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="mb-3">{feature.icon}</div>
              <div className="text-lg font-bold mb-2 text-gray-900">{feature.title}</div>
              <div className="text-gray-500 mb-1">{feature.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="flex-grow" />
      {/* FOOTER */}
      <motion.footer
        id="footer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7, type: "spring" }}
        className="w-full text-gray-700 bg-gradient-to-tr from-indigo-100 via-white to-purple-100 border-t border-indigo-200"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-5 py-8 px-4">
          <div className="flex items-center gap-3">
            <VideoCameraIcon className="h-8 w-8 text-indigo-500" />
            <span className="font-bold text-lg text-indigo-700 tracking-wide">Connectly</span>
            <span className="ml-2 text-xs italic text-gray-400">— Effortless video calls</span>
          </div>
          <nav className="flex gap-7">
            {footerLinks.map(link => (
              <a
                key={link.label}
                href={link.url}
                className="text-gray-700 hover:text-indigo-600 transition underline-offset-2 underline decoration-indigo-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="text-xs text-gray-400 text-center pb-2">© {new Date().getFullYear()} Connectly. All rights reserved.</div>
      </motion.footer>

      {/* Animated BG keyframe */}
      <style>
        {`
        .bg-gradient-to-tr {
          background-size: 200% 200%;
          animation: bgslide 16s ease-in-out infinite;
        }
        @keyframes bgslide {
          0%,100% { background-position: 0% 70%; }
          50% { background-position: 100% 20%; }
        }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
