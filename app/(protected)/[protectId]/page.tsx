

export default async function Page({params}:{params:{protectId:string}}) {
  return (
    <div>Page {params.protectId}</div>
  )
}
