import { useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { styles } from "../../constants/constant";

const Input = ({
  id,
  name,
  placeholder,
  type,
  maxLength,
  error,
  label,
  htmlFor,
  onMouseDownPassword,
  showPassword,
  changehandler,
  onClickHandler,
  sx,
  required,
  muliline,
  readOnly,
  styleInput,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Grid item xs={12} sx={[{ mx: "1vh", marginTop: "5px" }, sx]}>
      <Stack
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": { borderColor: "#052965" },
            "&.Mui-focused fieldset": {
              borderColor: styles.textColor,
            },
          },
          input: styleInput,
        }}
      >
        <InputLabel
          htmlFor={htmlFor}
          sx={{
            fontFamily: styles.fontFamily,
            color: styles.textColor,
            textAlign: "left",
          }}
        >
          {label} <span style={{ color: "red " }}>{required ? "*" : ""}</span>
        </InputLabel>
        <OutlinedInput
          sx={{
            borderColor: error ? "red" : isFocused ? "#486740" : "",
            fontFamily: styles.fontFamily,
            muliline: muliline,
            height: muliline && "6vh",
          }}
          onWheel={(event) => event.target.blur()}
          id={id}
          type={
            id === "-password-login"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          size="small"
          error={error}
          onChange={changehandler}
          required={required}
          inputProps={{
            maxLength: maxLength,
            readOnly: readOnly,
          }}
          placeholder={placeholder}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          {...props}
          endAdornment={
            id === "-password-login" && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onClickHandler}
                  onMouseDown={onMouseDownPassword}
                  edge="end"
                  size="medium"
                >
                  {showPassword ? (
                    <VisibilityIcon style={{ color: "green" }} />
                  ) : (
                    <VisibilityOffIcon style={{ color: "green" }} />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }
        />
        {error && (
          <Typography
            className="text-red-600"
            style={{ textAlign: "left", fontSize: 14, color: "red" }}
          >
            {error}
          </Typography>
        )}
      </Stack>
    </Grid>
  );
};

export default Input;
