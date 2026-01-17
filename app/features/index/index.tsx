import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button"

export function Welcome() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/tasks");
  }

  return (
    <div className="flex h-screen">
        <div className="flex flex-col items-center justify-center w-1/2 bg-foreground">
            <div className="bg-background p-8 rounded-lg h-1/3 w-2/4 flex flex-col justify-center items-center">
              <h1 className="text-foreground text-3xl">Welcome to EmpireTech to-do list!</h1>
              <p className="text-foreground mt-4">Your personal task manager to boost productivity and stay organized.</p>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 bg-background">
            <Button className="bg-foreground p-8 rounded-lg h-1/3 w-2/4 flex flex-col justify-center items-center text-xl" onClick={handleGetStarted}>
              <p className="mt-2 text-3xl">Click here to get started</p>
            </Button>
        </div>

    </div>
  );
}