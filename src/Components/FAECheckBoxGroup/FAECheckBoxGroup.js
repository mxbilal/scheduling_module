//libs
import React, { useState, Children } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

//src
import {
  FAEContainer,
  FAEText,
  FAEShadowBox,
} from "@findanexpert-fae/components";

//scss
import "./FAECheckBoxGroup.scss";

export const FAECheckBoxGroup = ({
  justify,
  align,
  className = "",
  label = "",
  values = [],
  direction = "horizontal",
  checkboxLabelProps,
  checkboxComponentsProps,
  shadowBoxProps,
  primary,
  renderOptions,
  alreadyCheckedValues = [],
  getSelectedValues = () => {},
  error = () => {},
  errorMessage,
  isRequired = false,
  ...rest
}) => {
  const [checkedValues, setCheckedValues] = useState(alreadyCheckedValues);
  const boxDirection = direction === "horizontal" ? "horizontal-check-box" : "";
  const [checkError, setCheckError] = useState(null);

  const handleChange = (event) => {
    if (checkedValues.some((checkedValue) => checkedValue === event)) {
      setCheckedValues(
        checkedValues.filter((checkedValue) => checkedValue !== event)
      );
      getSelectedValues(
        checkedValues.filter((checkedValue) => checkedValue !== event)
      );
      setCheckError(
        error(checkedValues.filter((checkedValue) => checkedValue !== event))
      );
    } else {
      setCheckedValues([...checkedValues, event]);
      getSelectedValues([...checkedValues, event]);
      setCheckError(error([...checkedValues, event]));
    }
  };

  return (
    <FAEContainer justify={justify} align={align}>
      {primary ? (
        <FAEShadowBox {...shadowBoxProps} padding={true}>
          <div
            className="fae--check-box-group-container"
            style={{ width: "95%" }}
          >
            <FAEText important={isRequired && true} tertiary>
              {label}
            </FAEText>
            <div
              className={`fae--check-box-group ${boxDirection} ${className}`}
            >
              {Children.toArray(
                values.map((valueObj) => {
                  const { value, label } = valueObj;
                  return (
                    <FormControlLabel
                      {...checkboxLabelProps}
                      value={value}
                      control={
                        <Checkbox
                          onChange={() => handleChange(value)}
                          checked={checkedValues.some(
                            (checkedValue) => checkedValue === value
                          )}
                          required={
                            checkedValues.length < 1 && isRequired
                              ? true
                              : false
                          }
                          {...rest}
                        />
                      }
                      label={
                        renderOptions ? (
                          renderOptions(valueObj)
                        ) : (
                          <FAEText>{label}</FAEText>
                        )
                      }
                    />
                  );
                })
              )}
            </div>
            {checkError && (
              <FAEText paragraph className="error">
                {errorMessage}
              </FAEText>
            )}
          </div>
        </FAEShadowBox>
      ) : (
        <>
          <div
            className="fae--check-box-group-container"
            style={{ width: "95%" }}
          >
            <FAEText important={isRequired && true} tertiary>
              {label}
            </FAEText>
            <div
              className={`fae--check-box-group ${boxDirection} ${className}`}
            >
              {Children.toArray(
                values.map((valueObj) => {
                  const { value, label } = valueObj;
                  return (
                    <FormControlLabel
                      {...checkboxLabelProps}
                      value={value}
                      control={
                        <Checkbox
                          onChange={() => handleChange(value)}
                          checked={checkedValues.some(
                            (checkedValue) => checkedValue === value
                          )}
                          required={
                            checkedValues.length < 1 && isRequired
                              ? true
                              : false
                          }
                          {...rest}
                        />
                      }
                      label={
                        renderOptions ? (
                          renderOptions(valueObj)
                        ) : (
                          <FAEText>{label}</FAEText>
                        )
                      }
                    />
                  );
                })
              )}
            </div>
            {checkError && (
              <FAEText paragraph className="error">
                {errorMessage}
              </FAEText>
            )}
          </div>
        </>
      )}
    </FAEContainer>
  );
};
