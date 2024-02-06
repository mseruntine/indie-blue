"use client"

// FileUpload.tsx
import React, { useRef, ChangeEvent, useState, useEffect } from 'react';
import { Button, Text, Image, Flex, Grid, GridItem, IconButton } from '@chakra-ui/react';
import { MdOutlineCancel } from 'react-icons/md';

interface FileUploadProps {
  id: string;
  title: string;
  prefilled?: string | string[];
  instructions: string;
  customWidth?: string;
  customHeight?: string;
}

const FileUpload: React.FC<FileUploadProps> = (props: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files || [];
    const imageFiles = Array.from(selectedFiles).filter((file) =>
      /\.(jpg|jpeg|png|ico)$/i.test(file.name)
    );

    // Update the preview images
    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setUploadedFiles(imageFiles);
    setPreviewImages(imagePreviews);
  };

  const handleRemoveFile = () => {
    // Remove the file and its preview
    const updatedFiles = [...uploadedFiles];
    const updatedPreviews = [...previewImages];
    updatedFiles.splice(0, updatedFiles.length);
    updatedPreviews.splice(0, updatedPreviews.length);

    setUploadedFiles(updatedFiles);
    setPreviewImages(updatedPreviews);

    console.log("Files removed");

  };

  // Cleanup preview images when component unmounts
  useEffect(() => {
    
    if (props.prefilled !== undefined && props.prefilled !== null) {
      setPreviewImages(Array.isArray(props.prefilled) ? props.prefilled : [props.prefilled]);
    }

    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <Flex flexDirection={"column"} gap={"10px"}>
      <Flex flexDirection={"row"} gap={"25px"}>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .ico"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={(input) => (fileInputRef.current = input)}
          multiple
        />
        <Button onClick={() => fileInputRef.current?.click()} variant="purple">
          {props.title}
        </Button>
        <IconButton as={MdOutlineCancel}
          _hover={{ color: 'red.500' }}
          aria-label={"Cancel Upload"}
          variant={"unstyled"}
          width={"24px"}
          height={"24px"}
          color={"rgba(255,255,255,0.5)"}
          onClick={handleRemoveFile}
          cursor={"pointer"}
        />
      </Flex>

      <Text fontSize={"14px"} fontWeight={"600"} color={"rgba(255,255,255,0.5)"} marginBottom="20px">{props.instructions}</Text>

      {/* Display image previews */}
      {previewImages.length !== 0 ? (
        <Grid templateColumns={"repeat(2, 1fr)"} columnGap={5} rowGap={5} marginBottom={"20px"}>
          {previewImages.map((url, index) => (
            previewImages[index] !== "" && previewImages[index] !== undefined ? <GridItem key={index} colSpan={1}>
              <Image
                id={props.id + "-" + index}
                src={url}
                borderRadius={"10px"}
                alt={`Preview ${index}`}
                height={props.customHeight !== undefined ? props.customHeight : "100px"}
                width={props.customWidth !== undefined ? props.customWidth : "100px"}
                m="2"
              />
            </GridItem> : null
          ))}
        </Grid>
      ) : null}
    </Flex>
  );
};

export default FileUpload;
