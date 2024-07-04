import { Login } from "@/components/login/login"
import Image from "next/image"

const LoginPage = () => {
    return (
      <section className="flex justify-around h-[100vh] items-center">
        <div className="flex flex-col justify-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">INTRANET - DEV</h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">Sistemas criados para portfólio</p>
          <Image
            src="/images/Company-amico.svg"
            width={400}
            height={400}
            alt="Company"
          />
        </div>
        <Login/>
      </section>
    )
  }
  
  export default LoginPage