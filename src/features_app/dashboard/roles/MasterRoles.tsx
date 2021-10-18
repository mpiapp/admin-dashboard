import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import BreadCrumbs from '../../../components/BreadCrumbs';
import TableData from '../../../components/TableData'
import { TableColumn } from 'react-data-table-component';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store';
import { 
    onGetRoles,
    onCreateRoles,
    onUpdateRoles,
    onRemoveRoles 
 } from './action/rolesAction';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { RolesInput, DataRow } from './rolesTypes'
import { ISelectOption } from '../globalTypes'
import { fetchFlag } from '../flag/flagSlice';
import { onGetModules } from '../modules/action/modulesAction';

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required")
    })
    .required();
  
    
function MasterRoles() {

    const dispatch = useDispatch()
    const stateroles = useSelector((state : RootState) => state.roles)
    const modules = useSelector((statemod : RootState) => statemod.modules)
    const flag = useSelector((stateflag : RootState) => stateflag.flag)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
      } = useForm<RolesInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const [selectedFlagRoles, setSelectedFlagRoles] = useState<ISelectOption>();
    
    const [selectedModules, setSelectedModules] = useState<ISelectOption[]>([]);

    const [optionsModules, setOptionsModules] = useState<ISelectOption[]>([]);
    const [optionsFlagRoles, setOptionsFlagRoles] = useState<ISelectOption[]>([]);

    const [viewModules, setViewModules] = useState({
        open: false,
        modules: []
    });
    
    const [errorSelectFlagRoles, setErrorSelectFlagRoles] = useState<boolean>(false);
    const [errorSelectModules, setErrorSelectModules] = useState<boolean>(false);


    const [open, setOpen] = useState(false);
    const [IdRoles, setIdRoles] = useState <any>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
      
     /* istanbul ignore next */
    const handleChangeFlagRoles = (value: any) : void => {
        setSelectedFlagRoles(value)
        setErrorSelectFlagRoles(false)
    }

     /* istanbul ignore next */
    const handleChangeModules = (value: any) : void => {
        setSelectedModules(value)
        setErrorSelectModules(false)
    }

     /* istanbul ignore next */
    const proceedModuleToArray = (value : any) => {
        let arrayIdModules = []
        for(let element of value) {
            arrayIdModules.push(element.value)
        }
        return arrayIdModules;
    }

     /* istanbul ignore next */
    const onSubmit = (data: RolesInput): void => {
        if(selectedFlagRoles === undefined) {
            setErrorSelectFlagRoles(true)
        } else if (selectedModules.length === 0) {
            setErrorSelectModules(true)
        } else {
            if(IdRoles === null) {
                let postDataRoles= {
                    name : data.name,
                    flag : selectedFlagRoles.value,
                    module_ids : proceedModuleToArray(selectedModules),
                }
                onCreateRoles(postDataRoles)
                reset()
            } else {
                let updateData= {
                    name : data.name,
                    flag : selectedFlagRoles.value,
                    module_ids : proceedModuleToArray(selectedModules),
                    id: IdRoles
                }
                onUpdateRoles(updateData)
                reset()
            }
        }
    }

     /* istanbul ignore next */
    const columns: TableColumn<DataRow>[] = [
        {
            name: 'ID',
            selector: row => row.id,

        },
        {
            name: 'NAME',
            selector: row => row.name,
        },
        {
            name: 'FLAG',
            selector: row => row.flag,
        },
        {
            name: 'MODULES',
            width: '200px',
            cell: () => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="text" color="success" size="small"
                        onClick={() => setViewModules({...viewModules, open: true})}
                    > 
                        View Modules
                    </Button>
                </Stack>
            ),
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
                            setIdRoles(row.id)
                            setTimeout(() => {
                                handleClickOpen()
                            }, 100);
                        }}
                    >
                        Update
                    </Button>
                    <Button onClick={() => onRemoveRoles(row) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        onGetRoles()
        onGetModules()
        dispatch(fetchFlag())
        // eslint-disable-next-line
    },  [stateroles.create, stateroles.update, stateroles.remove]);

     /* istanbul ignore next */
    useEffect(() => {
        if(flag?.data) {
            setOptionsFlagRoles(flag.data)
        }
    }, [flag]);


    useEffect(() => {
        const proceedOptions = () => {
            let initialData = modules.data
            let dataOptions = []
            /* istanbul ignore next */
            for(let value of initialData) {
                dataOptions.push({ value: value.id, label: value.name })
            }
            setOptionsModules(dataOptions)
        }
        proceedOptions()
    }, [modules]);

    return (
        <div>
            <Box pb={2}>
                <BreadCrumbs
                    current="Roles"
                    isPage={false}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <h2>Master Roles</h2>
                <Button 
                    variant="contained" color="primary" size="small" 
                    onClick={() => {
                        handleClickOpen()
                        reset()
                    }}
                >
                    Create New Role
                </Button>
            </Stack>
            <Box pt={4}>
                <TableData 
                    columns={columns}
                    data={stateroles?.data}
                    progressPending={stateroles?.loading}
                />
            </Box>

            {/* Modal Create new Roles */}
            <Dialog 
                open={open} 
                fullWidth={true}
                maxWidth="sm"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Add New Role</DialogTitle>
                    <div className="box-modal-modules">
                        <TextField
                            /* istanbul ignore next */
                            error={!!errors.name}
                            helperText={errors.name && errors.name.message}
                            {...register('name')}
                            margin="normal"
                            fullWidth
                            size="small"
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <Box pt={2}>
                            <Select
                                placeholder="Select Flag"
                                value={selectedFlagRoles}
                                isSearchable={false}
                                options={optionsFlagRoles}
                                onChange={handleChangeFlagRoles}
                            />
                            { 
                            /* istanbul ignore next */
                            errorSelectFlagRoles ? <div className="error-p"><p>Flag is required</p></div> : null }
                        </Box>
                        <Box pt={2}>
                            <Select
                                placeholder="Select Module"   
                                value={selectedModules}
                                isMulti={true}
                                options={optionsModules}
                                onChange={handleChangeModules}
                            />
                            { 
                            /* istanbul ignore next */
                            errorSelectModules ? <div className="error-p"><p>Module is required</p></div> : null }
                        </Box>
                        
                    </div>
                    <DialogActions>
                        <Button onClick={handleClose} color="warning">Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* View Detail Modules */}
            <Dialog 
                open={viewModules.open} 
                fullWidth={true}
                maxWidth="sm"
            >
                <div>
                    <DialogTitle>List All Modules</DialogTitle>
                    
                    <DialogActions>
                        <Button onClick={() => {
                             /* istanbul ignore next */
                             setViewModules({...viewModules, open: false})
                        }} color="warning">Cancel</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )   
}

export default MasterRoles
