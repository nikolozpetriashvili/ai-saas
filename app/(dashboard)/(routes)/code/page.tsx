'use client'

import * as z from 'zod';
import Heading from "@/components/Heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatCompletionMessage } from 'openai/resources/chat/index.mjs';
import axios from 'axios';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/User-avatar';
import { BotAvatar } from '@/components/Bot-avatar';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { useProModal } from '@/hooks/use-pro-modal';

const CodePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages,setMessages] = useState<ChatCompletionMessage[]>([]);
  //shadcn ui-is moyveba useForm da schirdeba generics rom gaarkvios ra tipis cvladia(String,int da ase sh.) constant.ts shi naxe ra tipis cvladad shemovikvanet(objectictia ra)
  //zod resolveri pasuxismgebelia validaciaze
  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      prompt: ""
    }
  })
  //use state is gamokenebis nacvlad shadcn ui-is form komponents tavis loadingis cvladi aqvs amitom wera agar gviwevs
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      const userMessage:ChatCompletionMessage = {
        role:'user',
        content:values.prompt
      }

      const newMessages = [...messages,userMessage];
      const response = await axios.post("/api/code",{
        messages:newMessages
      })

      setMessages((current) => [...current,userMessage,response.data]);
      
      form.reset();
    }catch(error:any){
      if(error?.response?.status === 403){
        proModal.onOpen();
      }
      toast.error("Code error");
    }finally{
      router.refresh();
    }
  }


  return(
    <div>
      <Heading title={'Code Generation'} description={'Our most advanced code generation model.'} icon={Code} iconColor={'text-green-700'} bgColor={'bg-green-700/10'} />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
              <FormField name='prompt' render={({field})=> (<FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                  <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' disabled={isLoading} placeholder='Simple toggle button using react hooks.'
                  {...field} 
                  />
                </FormControl>
              </FormItem>)} />
              <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading} >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className='space-y-4 mt-4'>
          {
            isLoading && (
              <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                <Loader/>
              </div>
            )
          }
          {messages.length == 0 && !isLoading && (
            <Empty label={'No conversation started'} />
          )}
          <div className='flex flex-col-reverse gap-y-4'>
            {messages.map((message) => (
              <div 
              key={message.content}
              className={cn('p-8 w-full flex items-start gap-x-8 rounded-lg',message.role === "user" ? "bg-white border border-black/10" : "bg-white" )}>
                {message.role === 'user' ? <UserAvatar/> : <BotAvatar/> }
                <ReactMarkdown components={{
                  pre:({node,...props}) => (
                    <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg' >
                      <pre {...props} />
                    </div>
                  ),
                  code:({node,...props}) => (
                    <code className='bg-black/10 rounded-lg p-1' {...props} />
                  )
                }} 
                className={'text-sm overflow-hidden leading-7'}>
                  {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodePage;