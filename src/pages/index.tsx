import { ComponentProps, useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { client } from "src/lib/client";
import { Button } from "src/lib/mantine/Button";
//mantine
import { Grid } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BiSearchAlt2 } from "react-icons/bi";
//component
import { MainImageSwiper } from "@component/MainImageSwiper";
import { BlogComponent } from "@component/BlogComponent";
import { Profile } from "@component/Profile";
import { AllTags } from "@component/AllTags";
import { Footer } from "@component/Footer";
//hooks
import { useGetAllTags } from "@hooks/useGetAllTags";

export type Blog = {
  title: string;
  body: string;
  description: string;
  image?: { url: string; height: number; width: number };
  tag: string[];
};

const Home: NextPage<MicroCMSListResponse<Blog>> = (props) => {
  const [search, setSearch] = useState<MicroCMSListResponse<Blog>>();
  const allTags = useGetAllTags(props.contents);

  const handleSubmit = async (value: { search: string }) => {
    const q = value.search;
    const data = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const json: MicroCMSListResponse<Blog> = await data.json();
    setSearch(json);
  };

  const handleClick: ComponentProps<"button">["onClick"] = async () => {
    setSearch(undefined);
  };

  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;

  const form = useForm({ initialValues: { search: "" } });

  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="mt-2 flex gap-x-2"
        >
          <BiSearchAlt2 />
          <TextInput
            placeholder="searching..."
            type="text"
            {...form.getInputProps("search")}
          />
          <Button type="submit" dent>
            ??????
          </Button>
          <Button type="reset" onClick={handleClick} dent>
            ????????????
          </Button>
        </form>
      </div>
      <p className="my-3 py-3 text-gray-500">{`${
        search ? "????????????" : "???????????????"
      } : ${totalCount}???`}</p>
      <Grid>
        <Grid.Col span={9}>
          <div>
            <MainImageSwiper />
          </div>
          {contents.length === 0 ? (
            <div className="mt-5 flex w-full justify-center">
              <p className="p-5 text-xl text-cyan-500">
                ??????????????????????????????????????????
              </p>
            </div>
          ) : (
            contents.map((content) => {
              return (
                <div key={content.id} className="pt-2">
                  <Link href={`/blog/${content.id}`}>
                    <a className="no-underline">
                      <BlogComponent
                        title={content.title}
                        content={content.description}
                        image={content.image}
                        tags={content.tag}
                      />
                    </a>
                  </Link>
                </div>
              );
            })
          )}
        </Grid.Col>
        <Grid.Col span={3}>
          <div className="px-2">
            <Profile padding={0} />
            <Button fullWidth color="teal" className="mt-2">
              ??????
            </Button>
            <AllTags allTags={allTags} />
          </div>
        </Grid.Col>
      </Grid>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  MicroCMSListResponse<Blog>
> = async () => {
  const data = await client.getList({ endpoint: "blog" });
  return { props: data };
};

export default Home;
