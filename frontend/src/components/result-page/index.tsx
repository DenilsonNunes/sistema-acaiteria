


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



type LimitSelectProps = {
  value: string
  onChange: (value: string) => void
}



const ResultPage = ({ value, onChange }: LimitSelectProps) => {

  return (
    <Select value={value} defaultValue={value} onValueChange={onChange}>

      <SelectTrigger className="w-18">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectGroup>
      </SelectContent>

    </Select>
  )
}

export default ResultPage