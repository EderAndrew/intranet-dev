'use client'
import { z } from "zod"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { login } from "@/lib/actions"


const formSchema = z.object({
    useremail: z.string().email("Esse não é um email válido"),
    userpassword:z.string().min(8, {
        message: "A Senha deve conter no minimo 8 characters",
    })
})

export const Login = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            useremail: "",
            userpassword: "",
        }
    })

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        const response = formSchema.safeParse(values)
        const info = await login(response.data as unknown as FormData)

        if(info){
            router.push('/home')
        }
    }
    
    return (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="useremail"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: jhon.doe@example.com" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userpassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite a sua senha..." type="password" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="text-end font-light text-orange-500">Esqueci minha senha</p>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Acessar</Button>
                    </CardFooter>
                </form>
            </Form>
           
        </Card>
    )
}
