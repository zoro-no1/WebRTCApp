import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const HomePage = () => {
  return (
    <div className="flex flex-col justify-center w-full h-screen  items-center bg-gray-500 gap-2">
      <Input className="bg-amber-100 w-60" type="text" placeholder="Name" />
      <Button type="submit" variant="outline">
        Join
      </Button>
    </div>
  )
}

export default HomePage
