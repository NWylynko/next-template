import { listAccounts } from "@/server/api/account";

export default async function AdminHomePage() {

  const { users } = await listAccounts();

  return (
    <main className="">
      <span>Admin Portal</span>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstName} {user.lastName} - {JSON.stringify(user.publicMetadata)}</li>
        ))}
      </ul>
    </main>
  );
}
