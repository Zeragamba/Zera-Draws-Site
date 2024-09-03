import {
  BoldItalicUnderlineToggles,
  CreateLink,
  headingsPlugin,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorProps,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor"
import { Box, SxProps } from "@mui/material"
import { grey } from "@mui/material/colors"
import { FC } from "react"

import "@mdxeditor/editor/style.css"
import { useMarkdownStyles } from "./MarkdownStyles"

export interface MarkdownEditorProps
  extends Omit<MDXEditorProps, "markdown" | "plugins"> {
  value: string
}

export const MarkdownEditor: FC<MarkdownEditorProps> = ({
  value,
  ...props
}) => {
  const markdownStyles = useMarkdownStyles()

  const editorStyles: SxProps = {
    "& .mdxeditor": {
      padding: 2,
      border: 1,
      borderRadius: 1,
      borderColor: grey[600],
    },
  }

  const mergedStyles = [
    editorStyles,
    ...(Array.isArray(markdownStyles) ? markdownStyles : [markdownStyles]),
  ]

  return (
    <Box sx={mergedStyles}>
      <MDXEditor
        className={"dark-theme"}
        contentEditableClassName={"markdown"}
        markdown={value}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CreateLink />
                <InsertThematicBreak />
              </>
            ),
          }),
          headingsPlugin(),
          quotePlugin(),
          listsPlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          markdownShortcutPlugin(),
        ]}
        {...props}
      />
    </Box>
  )
}
