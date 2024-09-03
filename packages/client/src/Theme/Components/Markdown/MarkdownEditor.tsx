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
import { Box, SxProps, useTheme } from "@mui/material"
import { grey } from "@mui/material/colors"
import { FC, useMemo } from "react"

import "@mdxeditor/editor/style.css"

export interface MarkdownEditorProps
  extends Omit<MDXEditorProps, "markdown" | "plugins"> {
  value: string
}

export const MarkdownEditor: FC<MarkdownEditorProps> = ({
  value,
  ...props
}) => {
  const theme = useTheme()

  const styles: SxProps = useMemo(
    () => ({
      "& .mdxeditor": {
        padding: 2,
        border: 1,
        borderRadius: 1,
        borderColor: grey[600],
      },
      "& .content-editable": {
        fontFamily: theme.typography.fontFamily,
        padding: 1,
        margin: 0,
        paddingTop: 3,

        "& p": {
          margin: 0,
          padding: 0,
          ...theme.typography.body1,
        },
        "& h1": {
          margin: 0,
          padding: 0,
          ...theme.typography.h1,
        },
        "& h2": {
          margin: 0,
          padding: 0,
          ...theme.typography.h2,
        },
        "& h3": {
          margin: 0,
          padding: 0,
          ...theme.typography.h3,
        },
        "& h4": {
          margin: 0,
          padding: 0,
          ...theme.typography.h4,
        },
        "& h5": {
          margin: 0,
          padding: 0,
          ...theme.typography.h5,
        },
        "& h6": {
          margin: 0,
          padding: 0,
          ...theme.typography.h6,
        },
      },
    }),
    [theme],
  )

  return (
    <Box sx={styles}>
      <MDXEditor
        className={"dark-theme"}
        contentEditableClassName={"content-editable"}
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
