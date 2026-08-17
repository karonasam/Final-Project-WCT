import React, { useEffect, useMemo, useState } from "react";
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";


import {
  LayoutDashboard,
  BookOpen,
  Tags,
  Users,
  User,
  ShoppingCart,
  BarChart3,
  Settings,
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  X,
  XCircle,
  TrendingUp,
  Package,
  Star,
  LogOut,
} from "lucide-react";
import {
BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis,
CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

function useGoogleFonts() {
useEffect(() => {
const id = "admin-dash-fonts";
if (document.getElementById(id)) return;
const link = document.createElement("link");
link.id = id;
link.rel = "stylesheet";
link.href =
"https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap";
document.head.appendChild(link);
}, []);
}

const seedCategories = [
{ id: "c1", name: "Fiction", description: "Novels, short stories, and literary works" },
{ id: "c2", name: "Non-Fiction", description: "Essays, biographies, and factual writing" },
{ id: "c3", name: "Science & Tech", description: "Science, engineering, and technology" },
{ id: "c4", name: "History", description: "Historical accounts and analysis" },
{ id: "c5", name: "Children", description: "Books for young readers" },
];

const seedUsers = [
{ id: "u1", name: "Amara Osei", email: "amara.osei@mail.com", role: "Customer", status: "Active", joined: "2024-02-11" },
{ id: "u2", name: "Liam Fournier", email: "liam.f@mail.com", role: "Customer", status: "Active", joined: "2024-05-03" },
{ id: "u3", name: "Sana Iqbal", email: "sana.iqbal@mail.com", role: "Editor", status: "Active", joined: "2023-11-20" },
{ id: "u4", name: "Diego Marín", email: "diego.marin@mail.com", role: "Customer", status: "Suspended", joined: "2024-07-14" },
{ id: "u5", name: "Grace Kim", email: "grace.kim@mail.com", role: "Customer", status: "Active", joined: "2025-01-09" },
{ id: "u6", name: "Otto Bergman", email: "otto.b@mail.com", role: "Admin", status: "Active", joined: "2023-06-01" },
{ id: "u7", name: "Fatima Zahra", email: "fatima.z@mail.com", role: "Customer", status: "Inactive", joined: "2024-09-22" },
];

const statusFlow = ["Pending", "Processing", "Shipped", "Delivered"];

const seedOrders = [
{ id: "ORD-1042", customer: "Amara Osei", date: "2026-08-09", items: [{ title: "The Quiet Meridian", qty: 1, price: 18.5 }, { title: "Bramble & Bee", qty: 2, price: 11.5 }], status: "Pending", payment: "Card" },
{ id: "ORD-1041", customer: "Liam Fournier", date: "2026-08-09", items: [{ title: "Signals & Systems", qty: 1, price: 41.0 }], status: "Processing", payment: "PayPal" },
{ id: "ORD-1040", customer: "Grace Kim", date: "2026-08-08", items: [{ title: "Fields of Static", qty: 1, price: 15.0 }, { title: "The Weight of Water", qty: 1, price: 17.25 }], status: "Shipped", payment: "Card" },
{ id: "ORD-1039", customer: "Diego Marín", date: "2026-08-07", items: [{ title: "A Brief History of Almost Everything", qty: 1, price: 24.99 }], status: "Delivered", payment: "Card" },
{ id: "ORD-1038", customer: "Fatima Zahra", date: "2026-08-06", items: [{ title: "Neural Tides", qty: 1, price: 32.0 }], status: "Cancelled", payment: "Bank Transfer" },
{ id: "ORD-1037", customer: "Sana Iqbal", date: "2026-08-05", items: [{ title: "Letters from the Interior", qty: 3, price: 21.0 }], status: "Delivered", payment: "Card" },
{ id: "ORD-1036", customer: "Otto Bergman", date: "2026-08-04", items: [{ title: "Empire of Rust", qty: 1, price: 26.5 }], status: "Delivered", payment: "PayPal" },
{ id: "ORD-1035", customer: "Amara Osei", date: "2026-08-02", items: [{ title: "The Cartographer's Daughter", qty: 1, price: 19.99 }], status: "Delivered", payment: "Card" },
];

const salesByMonth = [
{ month: "Mar", revenue: 4200 }, { month: "Apr", revenue: 5100 },
{ month: "May", revenue: 4800 }, { month: "Jun", revenue: 6300 },
{ month: "Jul", revenue: 7150 }, { month: "Aug", revenue: 5620 },
];

const signupsByMonth = [
{ month: "Mar", signups: 18 }, { month: "Apr", signups: 24 },
{ month: "May", signups: 21 }, { month: "Jun", signups: 33 },
{ month: "Jul", signups: 29 }, { month: "Aug", signups: 17 },
];

const uid = (p) => `${p}${Math.random().toString(36).slice(2, 8)}`;

const money = (n) => `$${n.toFixed(2)}`;

const orderTotal = (o) =>
  o.items.reduce((s, i) => s + i.qty * i.price, 0);


const NAV = [
{ key: "dashboard", label: "Dashboard", icon: LayoutDashboard, items: [{ key: "overview", label: "Overview" }] },
{ key: "books", label: "Book Management", icon: BookOpen, items: [
{ key: "view", label: "View Books" }, { key: "add", label: "Add Book" },
]},
{ key: "categories", label: "Category Management", icon: Tags, items: [
{ key: "view", label: "View Categories" }, { key: "add", label: "Add Category" },
]},
{ key: "users", label: "User Management", icon: Users, items: [
{ key: "view", label: "View Users" },
]},
{ key: "orders", label: "Order Management", icon: ShoppingCart, items: [
{ key: "view", label: "View Orders" },
]},
{ key: "reports", label: "Reports", icon: BarChart3, items: [
{ key: "sales", label: "Sales Report" }, { key: "bestsellers", label: "Best-Selling Books" },
{ key: "activity", label: "User Activity" },
]},
{ key: "settings", label: "Settings", icon: Settings, items: [
{ key: "profile", label: "Admin Profile" }, { key: "account", label: "Account Settings" },
]},
];

const STATUS_STYLE = {
Pending: "bg-[#FBF0DD] text-[#96661C] border-[#EED9AE]",
Processing: "bg-[#E4EEFB] text-[#2A5C9A] border-[#C7DCF3]",
Shipped: "bg-[#EDE7F9] text-[#5B3FA0] border-[#D9CCF2]",
Delivered: "bg-[#E3F1EA] text-[#2E7D53] border-[#BFE2CE]",
Cancelled: "bg-[#FBE7E5] text-[#A9433A] border-[#F1C6C1]",
Active: "bg-[#E3F1EA] text-[#2E7D53] border-[#BFE2CE]",
Suspended: "bg-[#FBE7E5] text-[#A9433A] border-[#F1C6C1]",
Inactive: "bg-[#EEEEEC] text-[#6B7280] border-[#DDDCD6]",
};


function Toast({ toasts }) {
return (
<div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2">
{toasts.map((t) => (
<div key={t.id}
className="flex items-center gap-2 rounded-lg border border-[#DDDCD6] bg-white px-4 py-3 shadow-lg text-sm text-[#1B1E27] animate-[fadein_.2s_ease]">
<CheckCircle2 size={16} className="text-[#2E7D53] shrink-0" />
<span>{t.msg}</span>
</div>
))}
</div>
);
}

function Badge({ text }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        STATUS_STYLE[text] || "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]"
      }`}
    >
      {text}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, delta, positive, accent }) {
  return (
    <div className="rounded-xl border border-[#E5E1D8] bg-white p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
          {label}
        </span>

        <div
          className="h-9 w-9 rounded-lg flex items-center justify-center"
          style={{ background: accent + "1a" }}
        >
          <Icon size={17} style={{ color: accent }} />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <span
          className="text-[28px] leading-none font-semibold text-[#1B1E27]"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          {value}
        </span>

        {delta && (
          <span
            className={`flex items-center gap-0.5 text-xs font-medium ${
              positive ? "text-[#2E7D53]" : "text-[#A9433A]"
            }`}
          >
            {positive ? (
              <ArrowUpRight size={13} />
            ) : (
              <ArrowDownRight size={13} />
            )}
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}

function Modal({ title, onClose, children, wide }) {
return (
<div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#12151C]/50 backdrop-blur-sm px-4" onClick={onClose}>
<div
className={`w-full ${wide ? "max-w-2xl" : "max-w-md"} rounded-xl bg-white border border-[#E5E1D8] shadow-2xl max-h-[88vh] overflow-y-auto`}
onClick={(e) => e.stopPropagation()}
>
<div className="flex items-center justify-between border-b border-[#E5E1D8] px-6 py-4 sticky top-0 bg-white">
<h3 className="text-[17px] font-semibold text-[#1B1E27]" style={{ fontFamily: "Fraunces, serif" }}>{title}</h3>
<button onClick={onClose} className="h-8 w-8 rounded-md flex items-center justify-center text-[#6B7280] hover:bg-[#F6F4EF] transition-colors">
<X size={17} />
</button>
</div>
<div className="px-6 py-5">{children}</div>
</div>
</div>
);
}

function Field({ label, children }) {
return (
<label className="flex flex-col gap-1.5 text-sm">
<span className="font-medium text-[#1B1E27]">{label}</span>
{children}
</label>
);
}

const inputCls = "w-full rounded-lg border border-[#DDDCD6] bg-[#FCFBF9] px-3 py-2 text-sm text-[#1B1E27] outline-none focus:border-[#C6A15B] focus focus:ring-[#C6A15B]/20 transition-colors";

function PrimaryBtn({ children, onClick, type = "button", icon: Icon, disabled }) {
return (
<button type={type} onClick={onClick} disabled={disabled}
className="inline-flex items-center gap-1.5 rounded-lg bg-[#1B1E27] px-4 py-2 text-sm font-medium text-white hover:bg-[#2A2E38] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
{Icon && <Icon size={15} />}{children}
</button>
);
}
function GhostBtn({ children, onClick, icon: Icon }) {
return (
<button onClick={onClick}
className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDDCD6] bg-white px-4 py-2 text-sm font-medium text-[#1B1E27] hover:bg-[#F6F4EF] transition-colors">
{Icon && <Icon size={15} />}{children}
</button>
);
}
function DangerBtn({ children, onClick, icon: Icon }) {
return (
<button onClick={onClick}
className="inline-flex items-center gap-1.5 rounded-lg bg-[#A9433A] px-4 py-2 text-sm font-medium text-white hover:bg-[#8F372F] transition-colors">
{Icon && <Icon size={15} />}{children}
</button>
);
}
function IconBtn({ onClick, icon: Icon, tone = "default", title }) {
const tones = {
default: "text-[#6B7280] hover:bg-[#F6F4EF] hover:text-[#1B1E27]",
danger: "text-[#6B7280] hover:bg-[#FBE7E5] hover:text-[#A9433A]",
};
return (
<button onClick={onClick} title={title} className={`h-8 w-8 rounded-md flex items-center justify-center transition-colors ${tones[tone]}`}>
<Icon size={15} />
</button>
);
}

function EmptyState({ label }) {
return (
<div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
<AlertCircle size={22} className="text-[#C6A15B]" />
<p className="text-sm text-[#6B7280]">{label}</p>
</div>
);
}


function PageHeader({ eyebrow, title, action }) {
return (
<div className="flex items-center justify-between mb-6 flex-wrap gap-3">
<div>
<span className="text-xs font-medium uppercase tracking-widest text-[#C6A15B]">{eyebrow}</span>
<h1 className="text-[26px] font-semibold text-[#1B1E27] mt-0.5" style={{ fontFamily: "Fraunces, serif" }}>{title}</h1>
</div>
{action}
</div>
);
}


export default function AdminDashboard() {
useGoogleFonts();

const [books, setBooks] = useState([]);
const [booksLoading, setBooksLoading] = useState(true);
const [categories, setCategories] = useState(seedCategories);
const [users, setUsers] = useState(seedUsers);
const [orders, setOrders] = useState(seedOrders);

// Live sync with Firestore "books" collection
useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "books"),
    (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setBooks(data);
      setBooksLoading(false);
    },
    (error) => {
      console.error("Error loading books:", error);
      setBooksLoading(false);
    }
  );
  return () => unsubscribe();
}, []);

const [activeGroup, setActiveGroup] = useState("dashboard");
const [activeItem, setActiveItem] = useState("overview");
const [openGroups, setOpenGroups] = useState({ dashboard: true, books: true });
const [sidebarOpen, setSidebarOpen] = useState(true);
const [mobileOpen, setMobileOpen] = useState(false);
const [profileMenuOpen, setProfileMenuOpen] = useState(false);

const [toasts, setToasts] = useState([]);
const notify = (msg) => {
const id = uid("t");
setToasts((t) => [...t, { id, msg }]);
setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
};

const goto = (groupKey, itemKey) => {
setActiveGroup(groupKey);
setActiveItem(itemKey);
setOpenGroups((o) => ({ ...o, [groupKey]: true }));
setMobileOpen(false);
};

const categoryName = (id) => categories.find((c) => c.id === id)?.name || "Uncategorized";

const totalRevenue = useMemo(
() => orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + orderTotal(o), 0),
[orders]
);
const recentOrders = useMemo(
() => [...orders].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5),
[orders]
);

const pageMeta = {
dashboard: "Dashboard",
books: "Book Management",
categories: "Category Management",
users: "User Management",
orders: "Order Management",
reports: "Reports",
settings: "Settings",
};

return (
<div className="w-full min-h-[720px] flex bg-[#F6F4EF]" style={{ fontFamily: "Inter, sans-serif" }}>
<style>{`
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(4px);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  ::selection {
    background: #C6A15B33;
  }
`}</style>

 
  <aside className={`${sidebarOpen ? "w-64" : "w-[76px]"} hidden md:flex flex-col bg-[#12151C] shrink-0 transition-all duration-200`}>
    <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10 shrink-0">
      <div className="h-8 w-8 rounded-md bg-[#C6A15B] flex items-center justify-center shrink-0">
        <BookOpen size={16} className="text-[#12151C]" />
      </div>
      {sidebarOpen && (
        <span className="text-white text-[17px] font-semibold tracking-wide" style={{ fontFamily: "Fraunces, serif" }}>BookVerse</span>
      )}
    </div>

    <nav className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-0.5">
      {NAV.map((group) => {
        const Icon = group.icon;
        const isActiveGroup = activeGroup === group.key;
        const isOpen = openGroups[group.key];
        return (
          <div key={group.key}>
            <button
              onClick={() => {
                if (group.items.length === 1) goto(group.key, group.items[0].key);
                else setOpenGroups((o) => ({ ...o, [group.key]: !o[group.key] }));
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActiveGroup ? "bg-white/10 text-white" : "text-[#9CA3AF] hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={17} className="shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left font-medium">{group.label}</span>
                  {group.items.length > 1 && (
                    isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                  )}
                </>
              )}
            </button>
            {sidebarOpen && isOpen && group.items.length > 1 && (
              <div className="ml-[26px] mt-0.5 mb-1 flex flex-col gap-0.5 border-l border-white/10 pl-4">
                {group.items.map((it) => {
                  const active = isActiveGroup && activeItem === it.key;
                  return (
                    <button
                      key={it.key}
                      onClick={() => goto(group.key, it.key)}
                      className={`text-left rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                        active ? "text-[#C6A15B] font-medium" : "text-[#9CA3AF] hover:text-white"
                      }`}
                    >
                      {it.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>

    <div className="border-t border-white/10 p-3">
      <button
        onClick={() => setSidebarOpen((s) => !s)}
        className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#9CA3AF] hover:bg-white/5 hover:text-white transition-colors"
      >
        <Menu size={17} />
        {sidebarOpen && <span>Collapse</span>}
      </button>
    </div>
  </aside>


  {mobileOpen && (
    <div className="fixed inset-0 z-[140] md:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
      <aside className="absolute left-0 top-0 bottom-0 w-72 bg-[#12151C] flex flex-col">
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-md bg-[#C6A15B] flex items-center justify-center">
              <BookOpen size={16} className="text-[#12151C]" />
            </div>
            <span className="text-white text-[17px] font-semibold" style={{ fontFamily: "Fraunces, serif" }}>Bindery</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-white/70"><X size={18} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-0.5">
          {NAV.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.key}>
                <div className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] text-sm font-medium">
                  <Icon size={16} />{group.label}
                </div>
                <div className="ml-[26px] mb-1 flex flex-col gap-0.5 border-l border-white/10 pl-4">
                  {group.items.map((it) => (
                    <button key={it.key} onClick={() => goto(group.key, it.key)}
                      className={`text-left rounded-md px-2.5 py-1.5 text-[13px] ${activeGroup === group.key && activeItem === it.key ? "text-[#C6A15B]" : "text-[#9CA3AF]"}`}>
                      {it.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
    </div>
  )}

  
  <div className="flex-1 flex flex-col min-w-0">
    
    <header className="h-16 border-b border-[#E5E1D8] bg-white flex items-center justify-between px-4 md:px-7 shrink-0">
      <div className="flex items-center gap-3">
        <button className="md:hidden text-[#1B1E27]" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
        <div className="hidden sm:flex items-center gap-1.5 text-sm text-[#6B7280]">
          <span>{pageMeta[activeGroup]}</span>
          <ChevronRight size={13} />
          <span className="text-[#1B1E27] font-medium capitalize">
            {NAV.find((g) => g.key === activeGroup)?.items.find((i) => i.key === activeItem)?.label}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-[#DDDCD6] bg-[#FCFBF9] px-3 py-1.5 w-56">
          <Search size={14} className="text-[#9CA3AF]" />
          <input placeholder="Quick search…" className="bg-transparent text-sm outline-none flex-1 placeholder:text-[#9CA3AF]" />
        </div>
        <div className="relative">
          <button onClick={() => setProfileMenuOpen((s) => !s)} className="flex items-center gap-2 rounded-lg pl-1 pr-2 py-1 hover:bg-[#F6F4EF] transition-colors">
            <div className="h-8 w-8 rounded-full bg-[#1B1E27] text-white flex items-center justify-center text-xs font-semibold">OB</div>
            <ChevronDown size={14} className="text-[#6B7280] hidden sm:block" />
          </button>
          {profileMenuOpen && (
            <div className="absolute right-0 top-11 w-48 rounded-lg border border-[#E5E1D8] bg-white shadow-xl py-1.5 z-30" onMouseLeave={() => setProfileMenuOpen(false)}>
              <button onClick={() => { goto("settings", "profile"); setProfileMenuOpen(false); }} className="w-full text-left px-3.5 py-2 text-sm text-[#1B1E27] hover:bg-[#F6F4EF] flex items-center gap-2"><User size={14} />Admin Profile</button>
              <button onClick={() => { goto("settings", "account"); setProfileMenuOpen(false); }} className="w-full text-left px-3.5 py-2 text-sm text-[#1B1E27] hover:bg-[#F6F4EF] flex items-center gap-2"><Settings size={14} />Account Settings</button>
              <div className="h-px bg-[#E5E1D8] my-1" />
              <button onClick={() => { notify("Signed out successfully"); setProfileMenuOpen(false); }} className="w-full text-left px-3.5 py-2 text-sm text-[#A9433A] hover:bg-[#FBE7E5] flex items-center gap-2"><LogOut size={14} />Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>

 
    <main className="flex-1 overflow-y-auto p-4 md:p-7">
      {activeGroup === "dashboard" && (
        <DashboardView
          books={books} users={users} orders={orders} totalRevenue={totalRevenue}
          recentOrders={recentOrders} goto={goto}
        />
      )}
      {activeGroup === "books" && (
        <BooksView
          books={books} booksLoading={booksLoading} categories={categories}
          categoryName={categoryName} activeItem={activeItem} goto={goto} notify={notify}
        />
      )}
      {activeGroup === "categories" && (
        <CategoriesView
          categories={categories} setCategories={setCategories} books={books}
          activeItem={activeItem} goto={goto} notify={notify}
        />
      )}
      {activeGroup === "users" && (
        <UsersView users={users} setUsers={setUsers} orders={orders} notify={notify} />
      )}
      {activeGroup === "orders" && (
        <OrdersView orders={orders} setOrders={setOrders} notify={notify} />
      )}
      {activeGroup === "reports" && (
        <ReportsView activeItem={activeItem} books={books} categoryName={categoryName} />
      )}
      {activeGroup === "settings" && (
        <SettingsView activeItem={activeItem} notify={notify} />
      )}
    </main>
  </div>

  <Toast toasts={toasts} />
</div>
);
}

function DashboardView({ books, users, orders, totalRevenue, recentOrders, goto }) {
return (
<div>
<PageHeader eyebrow="Overview" title="Dashboard" />
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
<StatCard icon={BookOpen} label="Total Books" value={books.length} delta="+4 this week" positive accent="#C6A15B" />
<StatCard icon={Users} label="Total Users" value={users.length} delta="+2 this week" positive accent="#4C9A8C" />
<StatCard icon={ShoppingCart} label="Total Orders" value={orders.length} delta="+8 this week" positive accent="#2A5C9A" />
<StatCard icon={DollarSign} label="Total Revenue" value={money(totalRevenue)} delta="+12.4%" positive accent="#2E7D53" />
</div>

  <div className="rounded-xl border border-[#E5E1D8] bg-white overflow-hidden">
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E1D8]">
      <h3 className="font-semibold text-[#1B1E27]" style={{ fontFamily: "Fraunces, serif" }}>Recent Orders</h3>
      <button onClick={() => goto("orders", "view")} className="text-sm text-[#C6A15B] font-medium hover:underline">View all</button>
    </div>
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-[#6B7280] text-xs uppercase tracking-wide border-b border-[#E5E1D8]">
          <th className="px-6 py-3 font-medium">Order</th>
          <th className="px-6 py-3 font-medium">Customer</th>
          <th className="px-6 py-3 font-medium">Date</th>
          <th className="px-6 py-3 font-medium">Total</th>
          <th className="px-6 py-3 font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        {recentOrders.map((o) => (
          <tr key={o.id} className="border-b border-[#F0EEE7] last:border-0 hover:bg-[#FCFBF9]">
            <td className="px-6 py-3 font-medium text-[#1B1E27]">{o.id}</td>
            <td className="px-6 py-3 text-[#1B1E27]">{o.customer}</td>
            <td className="px-6 py-3 text-[#6B7280]">{o.date}</td>
            <td className="px-6 py-3 text-[#1B1E27]">{money(orderTotal(o))}</td>
            <td className="px-6 py-3"><Badge text={o.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
);
}


function emptyBook(categories) {
  return { title: "", author: "", categoryId: categories[0]?.id || "", price: "", stock: "", imageUrl: "" };
}

function BooksView({ books, booksLoading, categories, categoryName, activeItem, goto, notify }) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyBook(categories));
  const [coverFile, setCoverFile] = useState(null);       // NEW
  const [coverPreview, setCoverPreview] = useState("");   // NEW

  useEffect(() => {
    if (activeItem === "add") {
      setForm(emptyBook(categories));
      setCoverFile(null);
      setCoverPreview("");
      setEditing("new");
    }
  }, [activeItem]); // eslint-disable-line

  const filtered = books.filter((b) => {
    const matchesQuery = (b.title + b.author).toLowerCase().includes(query.toLowerCase());
    const matchesCat = categoryFilter === "all" || b.categoryId === categoryFilter;
    return matchesQuery && matchesCat;
  });

  const startEdit = (b) => {
    setForm({ ...b, price: String(b.price), stock: String(b.stock) });
    setCoverFile(null);
    setCoverPreview(b.imageUrl || "");
    setEditing(b.id);
  };
  const startAdd = () => { setForm(emptyBook(categories)); setEditing("new"); };

  // NEW: handle file selection + local preview
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };
  

  const save = async () => {
    if (!form.title.trim() || !form.author.trim() || !form.price) {
      notify("Please fill in title, author and price");
      return;
    }

    setSaving(true);
    try {
      let imageUrl = form.imageUrl || "";

      // If a new file was chosen, upload it and use the resulting URL
      if (coverFile) {
        imageUrl = await uploadBookCover(coverFile);
      }

      const payload = {
        title: form.title.trim(),
        author: form.author.trim(),
        categoryId: form.categoryId,
        price: parseFloat(form.price) || 0,
        stock: parseInt(form.stock) || 0,
        imageUrl,
      };

      if (editing === "new") {
        await addDoc(collection(db, "books"), { ...payload, sold: 0 });
        notify(`${payload.title} added to catalog`);
        goto("books", "view");
      } else {
        await updateDoc(doc(db, "books", editing), payload);
        notify("Book updated");
      }
      setEditing(null);
      setCoverFile(null);
      setCoverPreview("");
    } catch (error) {
      console.error("Error saving book:", error);
      notify(editing === "new" ? "Failed to add book" : "Failed to update book");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "books", deleting.id));
      notify(`${deleting.title} deleted`);
    } catch (error) {
      console.error("Error deleting book:", error);
      notify("Failed to delete book");
    } finally {
      setDeleting(null);
    }
  };


const BookForm = (
<div className="flex flex-col gap-4">
<Field label="Title"><input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Book title" /></Field>
<Field label="Author"><input className={inputCls} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author name" /></Field>
<div className="grid grid-cols-2 gap-4">
<Field label="Category">
<select className={inputCls} value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
</select>
</Field>
<Field label="Cover image URL"><input className={inputCls} value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://…" /></Field>
</div>
<div className="grid grid-cols-2 gap-4">
<Field label="Price (USD)"><input type="number" step="0.01" className={inputCls} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" /></Field>
<Field label="Stock quantity"><input type="number" className={inputCls} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="0" /></Field>
</div>
{form.imageUrl && (
<div className="flex items-center gap-3 rounded-lg border border-[#E5E1D8] bg-[#FCFBF9] p-3">
<img
  src={form.imageUrl}
  alt="Cover preview"
  className="h-20 w-14 rounded-md object-cover border border-[#E5E1D8] bg-white"
  onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
/>
<span className="text-xs text-[#6B7280]">Cover preview</span>
</div>
)}
<div className="flex justify-end gap-2 pt-2">
<GhostBtn onClick={() => { setEditing(null); if (activeItem === "add") goto("books", "view"); }}>Cancel</GhostBtn>
<PrimaryBtn onClick={save} icon={CheckCircle2} disabled={saving}>
  {saving ? "Saving…" : editing === "new" ? "Add Book" : "Save Changes"}
</PrimaryBtn>
</div>
</div>
);

if (activeItem === "add") {
return (
<div>
<PageHeader eyebrow="Book Management" title="Add Book" />
<div className="max-w-xl rounded-xl border border-[#E5E1D8] bg-white p-6">{BookForm}</div>
</div>
);
}

return (
<div>
<PageHeader eyebrow="Book Management" title="View Books"
action={<PrimaryBtn icon={Plus} onClick={() => goto("books", "add")}>Add Book</PrimaryBtn>} />

  <div className="flex flex-wrap gap-3 mb-4">
    <div className="flex items-center gap-2 rounded-lg border border-[#DDDCD6] bg-white px-3 py-2 w-full sm:w-72">
      <Search size={15} className="text-[#9CA3AF]" />
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title or author…" className="bg-transparent text-sm outline-none flex-1 placeholder:text-[#9CA3AF]" />
    </div>
    <div className="flex items-center gap-2 rounded-lg border border-[#DDDCD6] bg-white px-3 py-2">
      <Filter size={14} className="text-[#9CA3AF]" />
      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-transparent text-sm outline-none">
        <option value="all">All categories</option>
        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
    </div>
    <span className="ml-auto self-center text-sm text-[#6B7280]">{filtered.length} of {books.length} books</span>
  </div>

  <div className="rounded-xl border border-[#E5E1D8] bg-white overflow-hidden overflow-x-auto">
    <table className="w-full text-sm min-w-[720px]">
      <thead>
        <tr className="text-left text-[#6B7280] text-xs uppercase tracking-wide border-b border-[#E5E1D8]">
          <th className="px-6 py-3 font-medium">Title</th>
          <th className="px-6 py-3 font-medium">Author</th>
          <th className="px-6 py-3 font-medium">Category</th>
          <th className="px-6 py-3 font-medium">Price</th>
          <th className="px-6 py-3 font-medium">Stock</th>
          <th className="px-6 py-3 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((b) => (
          <tr key={b.id} className="border-b border-[#F0EEE7] last:border-0 hover:bg-[#FCFBF9]">
            <td className="px-6 py-3 font-medium text-[#1B1E27]">
              <div className="flex items-center gap-3">
                <img
                  src={b.imageUrl}
                  alt={b.title}
                  className="h-11 w-8 rounded object-cover border border-[#E5E1D8] bg-[#F6F4EF] shrink-0"
                  onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
                />
                <span>{b.title}</span>
              </div>
            </td>
            <td className="px-6 py-3 text-[#6B7280]">{b.author}</td>
            <td className="px-6 py-3 text-[#6B7280]">{categoryName(b.categoryId)}</td>
            <td className="px-6 py-3 text-[#1B1E27]">{money(b.price)}</td>
            <td className="px-6 py-3">
              {b.stock === 0 ? <span className="text-[#A9433A] font-medium text-xs">Out of stock</span> : <span className="text-[#1B1E27]">{b.stock}</span>}
            </td>
            <td className="px-6 py-3">
              <div className="flex justify-end gap-1">
                <IconBtn icon={Pencil} title="Edit" onClick={() => startEdit(b)} />
                <IconBtn icon={Trash2} title="Delete" tone="danger" onClick={() => setDeleting(b)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {booksLoading && <EmptyState label="Loading books…" />}
    {!booksLoading && filtered.length === 0 && <EmptyState label="No books match your search." />}
  </div>

  {editing && editing !== "new" && (
    <Modal title="Edit Book" onClose={() => setEditing(null)}>{BookForm}</Modal>
  )}
  {deleting && (
    <Modal title="Delete Book" onClose={() => setDeleting(null)}>
      <p className="text-sm text-[#4B5563] mb-5">Delete <span className="font-medium text-[#1B1E27]">"{deleting.title}"</span> from the catalog? This can't be undone.</p>
      <div className="flex justify-end gap-2">
        <GhostBtn onClick={() => setDeleting(null)}>Cancel</GhostBtn>
        <DangerBtn icon={Trash2} onClick={confirmDelete}>Delete Book</DangerBtn>
      </div>
    </Modal>
  )}
</div>
);
}


function CategoriesView({ categories, setCategories, books, activeItem, goto, notify }) {
const [editing, setEditing] = useState(null);
const [deleting, setDeleting] = useState(null);
const [form, setForm] = useState({ name: "", description: "" });

useEffect(() => {
if (activeItem === "add") { setForm({ name: "", description: "" }); setEditing("new"); }
}, [activeItem]); // eslint-disable-line

const countFor = (id) => books.filter((b) => b.categoryId === id).length;

const startEdit = (c) => { setForm({ name: c.name, description: c.description }); setEditing(c.id); };

const save = () => {
if (!form.name.trim()) { notify("Category name is required"); return; }
if (editing === "new") {
setCategories((c) => [{ id: uid("c"), ...form }, ...c]);
notify(`Category "${form.name}" created`);
goto("categories", "view");
} else {
setCategories((cs) => cs.map((c) => c.id === editing ? { ...c, ...form } : c));
notify(`Category "${form.name}" updated`);
}
setEditing(null);
};

const confirmDelete = () => {
if (countFor(deleting.id) > 0) { notify("Move or remove its books before deleting this category"); setDeleting(null); return; }
setCategories((cs) => cs.filter((c) => c.id !== deleting.id));
notify(`Category "${deleting.name}" deleted`);
setDeleting(null);
};

const CatForm = (
<div className="flex flex-col gap-4">
<Field label="Category name"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Poetry" /></Field>
<Field label="Description"><textarea rows={3} className={inputCls} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" /></Field>
<div className="flex justify-end gap-2 pt-2">
<GhostBtn onClick={() => { setEditing(null); if (activeItem === "add") goto("categories", "view"); }}>Cancel</GhostBtn>
<PrimaryBtn onClick={save} icon={CheckCircle2}>{editing === "new" ? "Add Category" : "Save Changes"}</PrimaryBtn>
</div>
</div>
);

if (activeItem === "add") {
return (
<div>
<PageHeader eyebrow="Category Management" title="Add Category" />
<div className="max-w-xl rounded-xl border border-[#E5E1D8] bg-white p-6">{CatForm}</div>
</div>
);
}

return (
<div>
<PageHeader eyebrow="Category Management" title="View Categories"
action={<PrimaryBtn icon={Plus} onClick={() => goto("categories", "add")}>Add Category</PrimaryBtn>} />
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
{categories.map((c) => (
<div key={c.id} className="rounded-xl border border-[#E5E1D8] bg-white p-5 flex flex-col gap-3">
<div className="flex items-start justify-between">
<div className="h-9 w-9 rounded-lg bg-[#C6A15B]/15 flex items-center justify-center"><Tags size={16} className="text-[#C6A15B]" /></div>
<div className="flex gap-1">
<IconBtn icon={Pencil} onClick={() => startEdit(c)} />
<IconBtn icon={Trash2} tone="danger" onClick={() => setDeleting(c)} />
</div>
</div>
<div>
<h4 className="font-semibold text-[#1B1E27]">{c.name}</h4>
<p className="text-sm text-[#6B7280] mt-1">{c.description}</p>
</div>
<span className="text-xs font-medium text-[#6B7280] mt-1">{countFor(c.id)} books</span>
</div>
))}
</div>

  {editing && editing !== "new" && <Modal title="Edit Category" onClose={() => setEditing(null)}>{CatForm}</Modal>}
  {deleting && (
    <Modal title="Delete Category" onClose={() => setDeleting(null)}>
      <p className="text-sm text-[#4B5563] mb-5">Delete <span className="font-medium text-[#1B1E27]">"{deleting.name}"</span>?</p>
      <div className="flex justify-end gap-2">
        <GhostBtn onClick={() => setDeleting(null)}>Cancel</GhostBtn>
        <DangerBtn icon={Trash2} onClick={confirmDelete}>Delete Category</DangerBtn>
      </div>
    </Modal>
  )}
</div>
);
}


function UsersView({ users, setUsers, orders, notify }) {
const [query, setQuery] = useState("");
const [viewing, setViewing] = useState(null);
const [editing, setEditing] = useState(null);
const [deleting, setDeleting] = useState(null);
const [form, setForm] = useState({ name: "", email: "", role: "Customer", status: "Active" });

const filtered = users.filter((u) => (u.name + u.email).toLowerCase().includes(query.toLowerCase()));

const startEdit = (u) => { setForm({ name: u.name, email: u.email, role: u.role, status: u.status }); setEditing(u.id); };
const save = () => {
setUsers((us) => us.map((u) => u.id === editing ? { ...u, ...form } : u));
notify("User updated");
setEditing(null);
};
const confirmDelete = () => {
setUsers((us) => us.filter((u) => u.id !== deleting.id));
notify(`User "${deleting.name}" removed`);
setDeleting(null);
};
const userOrders = (name) => orders.filter((o) => o.customer === name);

return (
<div>
<PageHeader eyebrow="User Management" title="View Users" />
<div className="flex items-center gap-2 rounded-lg border border-[#DDDCD6] bg-white px-3 py-2 w-full sm:w-72 mb-4">
<Search size={15} className="text-[#9CA3AF]" />
<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users…" className="bg-transparent text-sm outline-none flex-1 placeholder:text-[#9CA3AF]" />
</div>

  <div className="rounded-xl border border-[#E5E1D8] bg-white overflow-hidden overflow-x-auto">
    <table className="w-full text-sm min-w-[680px]">
      <thead>
        <tr className="text-left text-[#6B7280] text-xs uppercase tracking-wide border-b border-[#E5E1D8]">
          <th className="px-6 py-3 font-medium">Name</th>
          <th className="px-6 py-3 font-medium">Email</th>
          <th className="px-6 py-3 font-medium">Role</th>
          <th className="px-6 py-3 font-medium">Status</th>
          <th className="px-6 py-3 font-medium">Joined</th>
          <th className="px-6 py-3 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((u) => (
          <tr key={u.id} className="border-b border-[#F0EEE7] last:border-0 hover:bg-[#FCFBF9]">
            <td className="px-6 py-3 font-medium text-[#1B1E27] flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-[#1B1E27] text-white text-[11px] flex items-center justify-center font-semibold">{u.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
              {u.name}
            </td>
            <td className="px-6 py-3 text-[#6B7280]">{u.email}</td>
            <td className="px-6 py-3 text-[#1B1E27]">{u.role}</td>
            <td className="px-6 py-3"><Badge text={u.status} /></td>
            <td className="px-6 py-3 text-[#6B7280]">{u.joined}</td>
            <td className="px-6 py-3">
              <div className="flex justify-end gap-1">
                <IconBtn icon={Eye} title="View" onClick={() => setViewing(u)} />
                <IconBtn icon={Pencil} title="Edit" onClick={() => startEdit(u)} />
                <IconBtn icon={Trash2} title="Delete" tone="danger" onClick={() => setDeleting(u)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {filtered.length === 0 && <EmptyState label="No users match your search." />}
  </div>

  {viewing && (
    <Modal title="User Details" onClose={() => setViewing(null)}>
      <div className="flex items-center gap-3 mb-5">
        <div className="h-12 w-12 rounded-full bg-[#1B1E27] text-white flex items-center justify-center font-semibold">{viewing.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
        <div>
          <h4 className="font-semibold text-[#1B1E27]">{viewing.name}</h4>
          <p className="text-sm text-[#6B7280]">{viewing.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
        <div><span className="block text-xs text-[#6B7280] uppercase tracking-wide mb-1">Role</span><span className="text-[#1B1E27] font-medium">{viewing.role}</span></div>
        <div><span className="block text-xs text-[#6B7280] uppercase tracking-wide mb-1">Status</span><Badge text={viewing.status} /></div>
        <div><span className="block text-xs text-[#6B7280] uppercase tracking-wide mb-1">Joined</span><span className="text-[#1B1E27] font-medium">{viewing.joined}</span></div>
        <div><span className="block text-xs text-[#6B7280] uppercase tracking-wide mb-1">Orders placed</span><span className="text-[#1B1E27] font-medium">{userOrders(viewing.name).length}</span></div>
      </div>
      <span className="block text-xs text-[#6B7280] uppercase tracking-wide mb-2">Order history</span>
      <div className="flex flex-col gap-2">
        {userOrders(viewing.name).length === 0 && <p className="text-sm text-[#9CA3AF]">No orders yet.</p>}
        {userOrders(viewing.name).map((o) => (
          <div key={o.id} className="flex items-center justify-between rounded-lg border border-[#E5E1D8] px-3 py-2 text-sm">
            <span className="font-medium text-[#1B1E27]">{o.id}</span>
            <span className="text-[#6B7280]">{o.date}</span>
            <Badge text={o.status} />
          </div>
        ))}
      </div>
    </Modal>
  )}

  {editing && (
    <Modal title="Edit User" onClose={() => setEditing(null)}>
      <div className="flex flex-col gap-4">
        <Field label="Full name"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="Email"><input className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Role">
            <select className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option>Customer</option><option>Editor</option><option>Admin</option>
            </select>
          </Field>
          <Field label="Status">
            <select className={inputCls} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Active</option><option>Suspended</option><option>Inactive</option>
            </select>
          </Field>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <GhostBtn onClick={() => setEditing(null)}>Cancel</GhostBtn>
          <PrimaryBtn icon={CheckCircle2} onClick={save}>Save Changes</PrimaryBtn>
        </div>
      </div>
    </Modal>
  )}

  {deleting && (
    <Modal title="Delete User" onClose={() => setDeleting(null)}>
      <p className="text-sm text-[#4B5563] mb-5">Remove <span className="font-medium text-[#1B1E27]">{deleting.name}</span> from the system?</p>
      <div className="flex justify-end gap-2">
        <GhostBtn onClick={() => setDeleting(null)}>Cancel</GhostBtn>
        <DangerBtn icon={Trash2} onClick={confirmDelete}>Delete User</DangerBtn>
      </div>
    </Modal>
  )}
</div>
);
}


function OrdersView({ orders, setOrders, notify }) {
const [query, setQuery] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
const [viewing, setViewing] = useState(null);
const [cancelling, setCancelling] = useState(null);

const filtered = orders.filter((o) => {
const matchesQuery = (o.id + o.customer).toLowerCase().includes(query.toLowerCase());
const matchesStatus = statusFilter === "all" || o.status === statusFilter;
return matchesQuery && matchesStatus;
});

const updateStatus = (id, status) => {
setOrders((os) => os.map((o) => o.id === id ? { ...o, status } : o));
notify(`Order ${id} marked as ${status}`);
setViewing((v) => v && v.id === id ? { ...v, status } : v);
};

const confirmCancel = () => {
updateStatus(cancelling.id, "Cancelled");
setCancelling(null);
};

return (
<div>
<PageHeader eyebrow="Order Management" title="View Orders" />
<div className="flex flex-wrap gap-3 mb-4">
<div className="flex items-center gap-2 rounded-lg border border-[#DDDCD6] bg-white px-3 py-2 w-full sm:w-72">
<Search size={15} className="text-[#9CA3AF]" />
<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search order ID or customer…" className="bg-transparent text-sm outline-none flex-1 placeholder:text-[#9CA3AF]" />
</div>
<div className="flex items-center gap-2 rounded-lg border border-[#DDDCD6] bg-white px-3 py-2">
<Filter size={14} className="text-[#9CA3AF]" />
<select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-transparent text-sm outline-none">
<option value="all">All statuses</option>
{[...statusFlow, "Cancelled"].map((s) => <option key={s}>{s}</option>)}
</select>
</div>
<span className="ml-auto self-center text-sm text-[#6B7280]">{filtered.length} of {orders.length} orders</span>
</div>

  <div className="rounded-xl border border-[#E5E1D8] bg-white overflow-hidden overflow-x-auto">
    <table className="w-full text-sm min-w-[720px]">
      <thead>
        <tr className="text-left text-[#6B7280] text-xs uppercase tracking-wide border-b border-[#E5E1D8]">
          <th className="px-6 py-3 font-medium">Order</th>
          <th className="px-6 py-3 font-medium">Customer</th>
          <th className="px-6 py-3 font-medium">Date</th>
          <th className="px-6 py-3 font-medium">Total</th>
          <th className="px-6 py-3 font-medium">Status</th>
          <th className="px-6 py-3 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((o) => (
          <tr key={o.id} className="border-b border-[#F0EEE7] last:border-0 hover:bg-[#FCFBF9]">
            <td className="px-6 py-3 font-medium text-[#1B1E27]">{o.id}</td>
            <td className="px-6 py-3 text-[#1B1E27]">{o.customer}</td>
            <td className="px-6 py-3 text-[#6B7280]">{o.date}</td>
            <td className="px-6 py-3 text-[#1B1E27]">{money(orderTotal(o))}</td>
            <td className="px-6 py-3"><Badge text={o.status} /></td>
            <td className="px-6 py-3">
              <div className="flex justify-end gap-1">
                <IconBtn icon={Eye} title="Details" onClick={() => setViewing(o)} />
                {o.status !== "Cancelled" && o.status !== "Delivered" && (
                  <IconBtn icon={XCircle} title="Cancel order" tone="danger" onClick={() => setCancelling(o)} />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {filtered.length === 0 && <EmptyState label="No orders match your filters." />}
  </div>

  {viewing && (
    <Modal title={`Order ${viewing.id}`} onClose={() => setViewing(null)} wide>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <span className="block text-xs text-[#6B7280] uppercase tracking-wide mb-1">Customer</span>
          <span className="text-[#1B1E27] font-medium">{viewing.customer}</span>
        </div>
        <div>
          <span className="block text-xs text-[#6B7280] uppercase tracking-wide mb-1">Date</span>
          <span className="text-[#1B1E27] font-medium">{viewing.date}</span>
        </div>
        <div>
          <span className="block text-xs text-[#6B7280] uppercase tracking-wide mb-1">Payment</span>
          <span className="text-[#1B1E27] font-medium">{viewing.payment}</span>
        </div>
        <div>
          <span className="block text-xs text-[#6B7280] uppercase tracking-wide mb-1">Status</span>
          <Badge text={viewing.status} />
        </div>
      </div>

      <div className="rounded-lg border border-[#E5E1D8] overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[#6B7280] text-xs uppercase tracking-wide bg-[#FCFBF9] border-b border-[#E5E1D8]">
              <th className="px-4 py-2.5 font-medium">Item</th>
              <th className="px-4 py-2.5 font-medium">Qty</th>
              <th className="px-4 py-2.5 font-medium">Price</th>
              <th className="px-4 py-2.5 font-medium text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {viewing.items.map((it, i) => (
              <tr key={i} className="border-b border-[#F0EEE7] last:border-0">
                <td className="px-4 py-2.5 text-[#1B1E27]">{it.title}</td>
                <td className="px-4 py-2.5 text-[#6B7280]">{it.qty}</td>
                <td className="px-4 py-2.5 text-[#6B7280]">{money(it.price)}</td>
                <td className="px-4 py-2.5 text-right text-[#1B1E27] font-medium">{money(it.qty * it.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end px-4 py-3 bg-[#FCFBF9] border-t border-[#E5E1D8] text-sm">
          <span className="text-[#6B7280] mr-3">Order total</span>
          <span className="font-semibold text-[#1B1E27]">{money(orderTotal(viewing))}</span>
        </div>
      </div>

      {viewing.status !== "Cancelled" && viewing.status !== "Delivered" && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[#6B7280] mr-1">Update status:</span>
          {statusFlow.map((s) => (
            <button key={s} onClick={() => updateStatus(viewing.id, s)}
              className={`text-xs font-medium rounded-full border px-3 py-1.5 transition-colors ${viewing.status === s ? STATUS_STYLE[s] : "border-[#DDDCD6] text-[#6B7280] hover:bg-[#F6F4EF]"}`}>
              {s}
            </button>
          ))}
          <button onClick={() => { setCancelling(viewing); }} className="text-xs font-medium rounded-full border border-[#F1C6C1] text-[#A9433A] px-3 py-1.5 hover:bg-[#FBE7E5] ml-auto">
            Cancel Order
          </button>
        </div>
      )}
    </Modal>
  )}

  {cancelling && (
    <Modal title="Cancel Order" onClose={() => setCancelling(null)}>
      <p className="text-sm text-[#4B5563] mb-5">Cancel order <span className="font-medium text-[#1B1E27]">{cancelling.id}</span> for {cancelling.customer}? The customer will be notified.</p>
      <div className="flex justify-end gap-2">
        <GhostBtn onClick={() => setCancelling(null)}>Keep Order</GhostBtn>
        <DangerBtn icon={XCircle} onClick={confirmCancel}>Cancel Order</DangerBtn>
      </div>
    </Modal>
  )}
</div>
);
}


const PIE_COLORS = ["#C6A15B", "#4C9A8C", "#2A5C9A", "#A9433A", "#5B3FA0"];

function ReportsView({ activeItem, books, categoryName }) {
const bestSellers = [...books].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 6);
const byCategory = useMemo(() => {
const map = {};
books.forEach((b) => { map[categoryName(b.categoryId)] = (map[categoryName(b.categoryId)] || 0) + (b.sold || 0); });
return Object.entries(map).map(([name, value]) => ({ name, value }));
}, [books]);

if (activeItem === "sales") {
const total = salesByMonth.reduce((s, m) => s + m.revenue, 0);
return (
<div>
<PageHeader eyebrow="Reports" title="Sales Report" />
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
<StatCard icon={DollarSign} label="6-Month Revenue" value={money(total)} accent="#2E7D53" />
<StatCard icon={TrendingUp} label="Avg Monthly" value={money(total / salesByMonth.length)} accent="#C6A15B" />
<StatCard icon={Package} label="Best Month" value={[...salesByMonth].sort((a,b)=>b.revenue-a.revenue)[0].month} accent="#2A5C9A" />
</div>
<div className="rounded-xl border border-[#E5E1D8] bg-white p-6">
<h3 className="font-semibold text-[#1B1E27] mb-5" style={{ fontFamily: "Fraunces, serif" }}>Monthly Revenue</h3>
<ResponsiveContainer width="100%" height={320}>
<BarChart data={salesByMonth}>
<CartesianGrid strokeDasharray="3 3" stroke="#EEECE4" vertical={false} />
<XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
<YAxis
  stroke="#9CA3AF"
  fontSize={12}
  tickLine={false}
  axisLine={false}
  tickFormatter={(v) => `$${v / 1000}k`}
/>
<Tooltip formatter={(v) => money(v)} contentStyle={{ borderRadius: 8, border: "1px solid #E5E1D8", fontSize: 13 }} />
<Bar dataKey="revenue" fill="#C6A15B" radius={[5, 5, 0, 0]} />
</BarChart>
</ResponsiveContainer>
</div>
</div>
);
}

if (activeItem === "bestsellers") {
return (
<div>
<PageHeader eyebrow="Reports" title="Best-Selling Books" />
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
<div className="rounded-xl border border-[#E5E1D8] bg-white p-6">
<h3 className="font-semibold text-[#1B1E27] mb-5" style={{ fontFamily: "Fraunces, serif" }}>Top Titles by Units Sold</h3>
<ResponsiveContainer width="100%" height={340}>
<BarChart data={bestSellers} layout="vertical" margin={{ left: 10 }}>
<CartesianGrid strokeDasharray="3 3" stroke="#EEECE4" horizontal={false} />
<XAxis type="number" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
<YAxis type="category" dataKey="title" width={140} stroke="#6B7280" fontSize={11.5} tickLine={false} axisLine={false} />
<Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E1D8", fontSize: 13 }} />
<Bar dataKey="sold" fill="#4C9A8C" radius={[0, 5, 5, 0]} />
</BarChart>
</ResponsiveContainer>
</div>
<div className="rounded-xl border border-[#E5E1D8] bg-white p-6">
<h3 className="font-semibold text-[#1B1E27] mb-4" style={{ fontFamily: "Fraunces, serif" }}>Ranked List</h3>
<div className="flex flex-col divide-y divide-[#F0EEE7]">
{bestSellers.map((b, i) => (
<div key={b.id} className="flex items-center gap-3 py-3">
<span className="h-7 w-7 rounded-full bg-[#F6F4EF] text-[#1B1E27] text-xs font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
<div className="min-w-0 flex-1">
<p className="text-sm font-medium text-[#1B1E27] truncate">{b.title}</p>
<p className="text-xs text-[#6B7280]">{b.author} · {categoryName(b.categoryId)}</p>
</div>
<span className="flex items-center gap-1 text-sm font-semibold text-[#1B1E27] shrink-0"><Star size={12} className="text-[#C6A15B] fill-[#C6A15B]" />{b.sold || 0}</span>
</div>
))}
</div>
</div>
</div>
</div>
);
}

// activity
return (
<div>
<PageHeader eyebrow="Reports" title="User Activity" />
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
<div className="lg:col-span-2 rounded-xl border border-[#E5E1D8] bg-white p-6">
<h3 className="font-semibold text-[#1B1E27] mb-5" style={{ fontFamily: "Fraunces, serif" }}>New Signups</h3>
<ResponsiveContainer width="100%" height={300}>
<LineChart data={signupsByMonth}>
<CartesianGrid strokeDasharray="3 3" stroke="#EEECE4" vertical={false} />
<XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
<YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
<Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E1D8", fontSize: 13 }} />
<Line type="monotone" dataKey="signups" stroke="#2A5C9A" strokeWidth={2.5} dot={{ r: 3.5 }} />
</LineChart>
</ResponsiveContainer>
</div>
<div className="rounded-xl border border-[#E5E1D8] bg-white p-6">
<h3 className="font-semibold text-[#1B1E27] mb-5" style={{ fontFamily: "Fraunces, serif" }}>Sales by Category</h3>
<ResponsiveContainer width="100%" height={260}>
<PieChart>
<Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
{byCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
</Pie>
<Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E1D8", fontSize: 13 }} />
</PieChart>
</ResponsiveContainer>
<div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 justify-center">
{byCategory.map((c, i) => (
<span key={c.name} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
<span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />{c.name}
</span>
))}
</div>
</div>
</div>
</div>
);
}


function SettingsView({ activeItem, notify }) {
const [profile, setProfile] = useState({ name: "Otto Bergman", email: "otto.b@mail.com", role: "Super Admin", bio: "Manages the catalog, orders, and storefront operations." });
const [account, setAccount] = useState({ current: "", next: "", confirm: "", twoFactor: true });

const saveProfile = (e) => { e.preventDefault(); notify("Profile updated"); };
const saveAccount = (e) => {
e.preventDefault();
if (account.next && account.next !== account.confirm) { notify("New password and confirmation don't match"); return; }
notify("Account settings saved");
setAccount({ ...account, current: "", next: "", confirm: "" });
};

if (activeItem === "account") {
return (
<div>
<PageHeader eyebrow="Settings" title="Account Settings" />
<form onSubmit={saveAccount} className="max-w-lg rounded-xl border border-[#E5E1D8] bg-white p-6 flex flex-col gap-4">
<Field label="Current password"><input type="password" className={inputCls} value={account.current} onChange={(e) => setAccount({ ...account, current: e.target.value })} placeholder="••••••••" /></Field>
<Field label="New password"><input type="password" className={inputCls} value={account.next} onChange={(e) => setAccount({ ...account, next: e.target.value })} placeholder="••••••••" /></Field>
<Field label="Confirm new password"><input type="password" className={inputCls} value={account.confirm} onChange={(e) => setAccount({ ...account, confirm: e.target.value })} placeholder="••••••••" /></Field>
<label className="flex items-center justify-between rounded-lg border border-[#E5E1D8] px-4 py-3 mt-1">
<div>
<p className="text-sm font-medium text-[#1B1E27]">Two-factor authentication</p>
<p className="text-xs text-[#6B7280]">Require a code at sign-in</p>
</div>
<input type="checkbox" checked={account.twoFactor} onChange={(e) => setAccount({ ...account, twoFactor: e.target.checked })} className="h-4 w-4 accent-[#C6A15B]" />
</label>
<div className="flex justify-end pt-2"><PrimaryBtn type="submit" icon={CheckCircle2}>Save Changes</PrimaryBtn></div>
</form>
</div>
);
}

return (
<div>
<PageHeader eyebrow="Settings" title="Admin Profile" />
<form onSubmit={saveProfile} className="max-w-lg rounded-xl border border-[#E5E1D8] bg-white p-6 flex flex-col gap-4">
<div className="flex items-center gap-4 mb-1">
<div className="h-16 w-16 rounded-full bg-[#1B1E27] text-white flex items-center justify-center text-xl font-semibold">
{profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
</div>
<div>
<p className="text-sm font-medium text-[#1B1E27]">{profile.name}</p>
<p className="text-xs text-[#6B7280]">{profile.role}</p>
</div>
</div>
<Field label="Full name"><input className={inputCls} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></Field>
<Field label="Email"><input className={inputCls} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></Field>
<Field label="Bio"><textarea rows={3} className={inputCls} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} /></Field>
<div className="flex justify-end pt-2"><PrimaryBtn type="submit" icon={CheckCircle2}>Save Changes</PrimaryBtn></div>
</form>
</div>
);
} 