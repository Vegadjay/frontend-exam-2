import Link from "next/link"

export const Navbar = () => {

  const navItems = [{
    id: 1,
    itemName: "Appointment",
    href: "/appointment"
  }, {
    id: 2,
    itemName: "Queue",
    href: "/queue"
  }, {
    id: 3,
    itemName: "Doctor",
    href: "/doctor"
  }, {
    id: 4,
    itemName: "Prescriptions",
    href: "/prescriptions"
  }, {
    id: 5,
    itemName: "Reports",
    href: "/reports"
  }, {
    id: 6,
    itemName: "Admin",
    href: "/admin"
  }]


  return (
    <div className="w-full h-10 flex justify-between items-center max-w-4xl mx-auto">
      <div>
        <Link href={"/"}>Logo here</Link>
      </div>
      <div className="flex gap-2">
        {navItems.map((item) => (
          <Link key={item.id} href={item.href}>{item.itemName}</Link>
        ))}
      </div>
      <div>
        <Link href={"/login"}>Login here</Link>
      </div>
    </div>
  )
}
