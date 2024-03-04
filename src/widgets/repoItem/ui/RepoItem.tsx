import { Link } from "react-router-dom";

import { Card, Typography } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
const { Text } = Typography;

export interface RepoItemProps {
  repo: Repo;
}
export interface Repo {
  description: string;
  id: string;
  languages: {
    nodes: { name: string }[];
  };
  name: string;
  owner: {
    avatarUrl: string;
    login: string;
    url: string;
  };
  pushedAt: string;
  stargazerCount: number;
  url: string;
}
export default function RepoItem({ repo }: RepoItemProps) {
  const date = new Date(repo.pushedAt);
  const formattedDate = date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    /* second: "2-digit", */
  });
  return (
    <Card
      className="border-slate-300    w-3/5 mt-2 h-70 hover:cursor-pointer"
      hoverable
    >
      <Link className="repoItem_link" to={`/${repo.id}`}>
        <Title level={3}>{repo.name}</Title>
        <Paragraph>
          <Text>
            <p>
              Дата последнего коммита : <Text strong>{formattedDate}</Text>
            </p>
          </Text>
        </Paragraph>
        <Paragraph>
          <Text>
            <p>
              Рейтинг: <Text strong>{repo.stargazerCount}</Text>
            </p>
          </Text>
        </Paragraph>
      </Link>
      <a className="repoItem_url" href={repo.url} target="_blank">
        Ссылка на репозиторий
      </a>
    </Card>
  );
}
