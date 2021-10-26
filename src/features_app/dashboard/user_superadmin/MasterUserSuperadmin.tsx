import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import BreadCrumbs from '../../../components/BreadCrumbs';
import TableData from '../../../components/TableData'
import { TableColumn } from 'react-data-table-component';
import TextField from '@mui/material/TextField';
import Select from 'react-select'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../app/store';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { 
    ISelectOption,
} from '../globalTypes'
import { DataRowUserSuperadmin, UserSuperadminInput } from './userSuperadminTypes'
import { 
    onGetUserSuperadmin, 
    onCreateUserSuperadmin, 
    onRemoveUserSuperadmin, 
    onUpdateUserSuperadmin 
} from './action/userSuperadminAction';
import { fetchFlag } from '../flag/flagSlice';

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required"),
        email: yup.string()
        .required("Email is required")
        .email("Email is invalid"),
        password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
    })
    .required();
  

    
function MasterUserSuperadmin() {
    const dispatch = useDispatch()

    const usersuperadmin = useSelector((state : RootState) => state.usersuperadmin)
    const flag = useSelector((stateflag : RootState) => stateflag.flag)

    const [open, setOpen] = useState(false);
    const [IdUserSuperadmin, setIdUserSuperadmin] = useState <any>(null);

    const [optionsFlagFeatures, setOptionsFlagFeatures] = useState<ISelectOption[]>([]);
    const [selectedFlagFeatures, setSelectedFlagFeatures] = useState<ISelectOption>();
    const [errorSelectFlagFeatures, setErrorSelectFlagFeatures] = useState<boolean>(false);

     /* istanbul ignore next */
    const handleChangeFlagFeatures = (value: any) : void => {
        setSelectedFlagFeatures(value)
        setErrorSelectFlagFeatures(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
      } = useForm<UserSuperadminInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });
      
    /* istanbul ignore next */
    const onSubmit = (data: UserSuperadminInput): void => {
        if(selectedFlagFeatures === undefined) {
            setErrorSelectFlagFeatures(true)
        } else {
            if(IdUserSuperadmin === null) {
                let postUser = {
                    name : data.name,
                    email : data.email,
                    password : data.password,
                    flag : selectedFlagFeatures.value,
                }
                onCreateUserSuperadmin(postUser)
                reset()
            } else {
                let putUser= {
                    name : data.name,
                    email : data.email,
                    password : data.password,
                    flag : selectedFlagFeatures.value,
                    id: IdUserSuperadmin
                }
                onUpdateUserSuperadmin(putUser)
                reset()
            }
        }
    }

    /* istanbul ignore next */  
    const columns: TableColumn<DataRowUserSuperadmin>[] = [
        {
            name: 'ID',
            selector: row => row.id,
            width: '200px'

        },
        {
            name: 'NAME',
            selector: row => row.name,
        },
        {
            name: 'EMAIL',
            selector: row => row.email,
        },
        {
            name: 'ROLE',
            selector: row => row.role,
        },
        {
            name: 'STATUS',
            selector: row => row.status,
        },
        {
            name: 'VERIFIED',
            cell: (row) => (
                <p>{ row.verified === true ? "Verified" : "Unverified"}</p>
            ),
        },
        {
            name: 'FLAG',
            selector: row => row.flag,
        },
        {
            name: 'ACTION',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" color="primary" size="small"
                        onClick={() => {
                            setValue("name", row.name);
                            setValue("email", row.email);
                            setValue("status", row.status);
                            setIdUserSuperadmin(row.id)
                            setTimeout(() => {
                                handleClickOpen()
                            }, 100);
                        }}
                    >
                        Update
                    </Button>
                    <Button onClick={() => onRemoveUserSuperadmin(row) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        onGetUserSuperadmin()
        dispatch(fetchFlag())
        // eslint-disable-next-line
    },  [usersuperadmin.create, usersuperadmin.update, usersuperadmin.remove]);

    /* istanbul ignore next */
    useEffect(() => {
        if(flag?.data) {
            setOptionsFlagFeatures(flag.data)
        }
    }, [flag]);

    return (
        <div>
            <Box pb={2}>
                <BreadCrumbs
                    current="Users Superadmin"
                    isPage={false}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <h2>Master Users Superadmin</h2>
                <Button 
                    variant="contained" color="primary" size="small" 
                    onClick={() => {
                        handleClickOpen()
                        reset()
                    }}
                >
                    Create New User
                </Button>
            </Stack>
            <Box pt={4}>
                <TableData 
                    columns={columns}
                    data={usersuperadmin?.data}
                    progressPending={usersuperadmin?.loading}
                />
            </Box>
            <Dialog 
                open={open} 
                fullWidth={true}
                maxWidth="sm"
            >
                <form onSubmit={handleSubmit(onSubmit)} >
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogContent style={{minHeight: 500}}>
                        <TextField
                            /* istanbul ignore next */
                            error={!!errors.name}
                             /* istanbul ignore next */
                            helperText={errors.name && errors.name.message}
                            {...register('name')}
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            size="small"
                            autoFocus
                        />
                        <TextField
                            /* istanbul ignore next */
                            error={!!errors.email}
                             /* istanbul ignore next */
                            helperText={errors.email && errors.email.message}
                            {...register('email')}
                            margin="normal"
                            fullWidth
                            id="email-user"
                            label="Email"
                            name="email"
                            size="small"
                        />
                        <TextField
                            /* istanbul ignore next */
                            error={!!errors.password}
                             /* istanbul ignore next */
                            helperText={errors.password && errors.password.message}
                            {...register('password')}
                            margin="normal"
                            fullWidth
                            type="password"
                            id="password-user"
                            label="Password"
                            name="password"
                            size="small"
                        />
                        <Box pt={2}>
                            <Select
                                placeholder="Select Flag"
                                value={selectedFlagFeatures}
                                isSearchable={false}
                                options={optionsFlagFeatures}
                                onChange={handleChangeFlagFeatures}
                            />
                            { 
                            /* istanbul ignore next */
                            errorSelectFlagFeatures ? <div className="error-p"><p>Flag is required</p></div> : null }
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="warning">Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )   
}

export default MasterUserSuperadmin
