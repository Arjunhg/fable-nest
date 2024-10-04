import React, { useEffect } from 'react'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/modal";
import { Button } from '@nextui-org/button';
import Image from 'next/image';

function CustomLoader({isLoading}:any) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {

        if(isLoading){
            onOpen();
        }

    }, [isLoading, onOpen])

  return (

    <div >
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      {isLoading && <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} className='backdrop-blur-sm'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className='p-10 flex w-full justify-center items-center'>
                <Image src={'/loader.gif'} alt='loader' width={200} height={200} className='w-[200px] h-[200px]'/>

                <h2 className='font-bold text-2xl text-primary text-center'>Please Wait...Story Generating...</h2>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>}
    </div>
  )
}

export default CustomLoader
