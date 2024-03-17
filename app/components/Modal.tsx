import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { saveSearch } from "@/utils/supabase/supabaseFunc"
interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      imageLinks?: {
        thumbnail: string;
      };
    };
  }
export default function App(props:any) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const Save =  async () => {
  try{
    console.log(props.book)
    await saveSearch(props.book, props.query)
    
    alert("保存しました！")
  }catch(error){
    alert("保存に失敗しました")
  }
    
    

  }

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">保存しますか?</ModalHeader>
              
              <ModalBody>
               
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} >
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={Save}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
