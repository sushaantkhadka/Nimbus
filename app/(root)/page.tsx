import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  return (
    <div className="p-4">
      <p>hello</p>
      <UserButton afterSignOutUrl="/" />
      <Button >
        <a href="/sign-in">Login</a>
        </Button>

    </div>
  );
}
export default SetupPage
