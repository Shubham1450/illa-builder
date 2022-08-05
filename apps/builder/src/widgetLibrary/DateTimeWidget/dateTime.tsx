import { FC, forwardRef, useCallback, useEffect } from "react"
import dayjs from "dayjs"
import { DatePicker } from "@illa-design/date-picker"
import { DateTimeWidgetProps, WrappedDateTimeProps } from "./interface"

export const WrappedDateTime = forwardRef<any, WrappedDateTimeProps>(
  (props, ref) => {
    const {
      value,
      dateFormat,
      placeholder,
      showClear,
      minDate,
      disabled,
      maxDate,
      readOnly,
      minuteStep,
      timeFormat,
      colorScheme,
      handleUpdateDsl,
    } = props

    const checkRange = useCallback(
      current => {
        const beforeMinDate = minDate
          ? !!current?.isBefore(dayjs(minDate))
          : false
        const afterMaxDate = maxDate
          ? !!current?.isAfter(dayjs(maxDate))
          : false
        return beforeMinDate || afterMaxDate
      },
      [minDate, maxDate],
    )

    return (
      <DatePicker
        showTime={{ step: { minute: minuteStep }, format: timeFormat }}
        colorScheme={colorScheme}
        format={dateFormat}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        allowClear={showClear}
        disabledDate={checkRange}
        onClear={() => {
          handleUpdateDsl({ value: "" })
        }}
        onChange={value => {
          handleUpdateDsl({ value })
        }}
      />
    )
  },
)

WrappedDateTime.displayName = "WrappedDateTime"

export const DateTimeWidget: FC<DateTimeWidgetProps> = props => {
  const {
    value,
    dateFormat,
    placeholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    readOnly,
    minuteStep,
    timeFormat,
    colorScheme,
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateDsl,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      dateFormat,
      placeholder,
      showClear,
      minDate,
      disabled,
      maxDate,
      readOnly,
      minuteStep,
      timeFormat,
      colorScheme,
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: "" })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    value,
    dateFormat,
    placeholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    readOnly,
    minuteStep,
    timeFormat,
    colorScheme,
  ])
  return <WrappedDateTime {...props} />
}

DateTimeWidget.displayName = "DateTimeWidget"
