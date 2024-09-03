import { FeatureFlagsSchema } from "./SiteMetaSchema"

test("FeatureFlagsSchema", () => {
  expect(
    FeatureFlagsSchema.parse({
      input: "true",
    }),
  ).toEqual({
    input: true,
  })

  expect(
    FeatureFlagsSchema.parse({
      input: "t",
    }),
  ).toEqual({
    input: true,
  })

  expect(
    FeatureFlagsSchema.parse({
      input: "false",
    }),
  ).toEqual({
    input: false,
  })
})
