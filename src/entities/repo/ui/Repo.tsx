import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetRepo from "../useGetRepo";
import { useAppSelector } from "../../../app/store/hooks";
import Loader from "../../../widgets/loader/ui/Loader";

import { Card, Typography } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Link from "antd/es/typography/Link";

export default function Repo() {
  const { id } = useParams();
  const { loading, searchRepository } = useGetRepo();
  const repo = useAppSelector((state) => state.repos.currentRepo);
  useEffect(() => {
    searchRepository(id);
  }, []);
  const { Text } = Typography;
  let formattedDate = "";
  if (repo) {
    const date = new Date(repo?.pushedAt);
    formattedDate = date.toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      /* second: "2-digit", */
    });
  }

  if (loading) return <Loader />;
  if (repo) {
    return (
      <Card className="w-2/3 border-slate-300 h-min mx-auto my-4 ">
        <img className="w-60" src={repo.owner.avatarUrl} alt="" />
        <Title level={3}>{repo.name}</Title>
        <Paragraph>
          <Text>
            Автор:&ensp;
            <Link href={repo.owner.url} target="_blank">
              {repo.owner.login}
            </Link>
          </Text>
        </Paragraph>
        <Paragraph>
          <Text>
            Рейтинг: &ensp; <span>{repo.stargazerCount}</span>
          </Text>
        </Paragraph>
        <Paragraph>
          <Text>
            Последний комит:&ensp; <span>{formattedDate}</span>
          </Text>
        </Paragraph>
        <Paragraph>
          Языки:&emsp;
          {repo.languages.nodes.length === 0 ? (
            <span>не указано</span>
          ) : (
            repo.languages.nodes.map((lang: { name: string }) => (
              <span key={lang.name}>{lang.name} </span>
            ))
          )}
        </Paragraph>
        <Paragraph>
          <Text>
            <b>Описание:</b>
            <br />
            {repo.description}
          </Text>
        </Paragraph>
      </Card>
    );
  }
}
