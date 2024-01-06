

export default async function Page({params}:{params:{adminId:string}}) {
  return (
    <div>Page {params.adminId}</div>
  )
}
