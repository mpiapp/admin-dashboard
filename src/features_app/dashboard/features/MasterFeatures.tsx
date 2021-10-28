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
    onGetFeatures,  
    onCreateFeatures,
    onUpdateFeatures,
    onRemoveFeatures 
} from './action/featuresAction'
import { onGetCapability } from '../capabilities/action/capabilitiesAction';
import { fetchFlag } from '../flag/flagSlice';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { 
    FeaturesInput,
    DataRow 
} from './featuresTypes'

import { 
    ISelectOption,
} from '../globalTypes'
import { onGetConfigStatus } from '../status_config/action/configStatusAction';

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required")
    }) 

    
function MasterFeatures() {
      
    const dispatch = useDispatch()
    const features = useSelector((state : RootState) => state.features)
    const capabilities = useSelector((statecap : RootState) => statecap.capabilities)
    const statusConfig = useSelector((statusconf : RootState) => statusconf.statusConfig)
    const flag = useSelector((stateflag : RootState) => stateflag.flag)
    
    const [open, setOpen] = useState(false);
    const [IdCapability, setIdCapability] = useState <any>(null);

    const [options, setOptions] = useState<ISelectOption[]>([]);
    const [optionsFlagFeatures, setOptionsFlagFeatures] = useState<ISelectOption[]>([]);

    const [selectedFlagFeatures, setSelectedFlagFeatures] = useState<ISelectOption>();
    const [selectedOption, setSelectedOption] = useState<ISelectOption[]>([]);

    const [errorSelectFlagFeatures, setErrorSelectFlagFeatures] = useState<boolean>(false);
    const [errorSelect, setErrorSelect] = useState<boolean>(false);

    /* istanbul ignore next */
    const handleChange = (value: any) : void => {
        setSelectedOption(value)
    }

    /* istanbul ignore next */
    const handleChangeFlagFeatures = (value: any) : void => {
        setSelectedFlagFeatures(value)
        setErrorSelectFlagFeatures(false)
    }

    const handleClickOpen = () : void => {
        setOpen(true);
    };

    const handleClose = () : void => {
        setOpen(false);
        setSelectedOption([])
    };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
      } = useForm<FeaturesInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    /* istanbul ignore next */
    const proceedToArray = (value : any) => {
        let arrayCapabilities = []
        for(let element of value) {
            arrayCapabilities.push(element.value)
        }
        return arrayCapabilities;
    }
      
    /* istanbul ignore next */
    const onSubmit = (data: FeaturesInput): void => {
        if(selectedFlagFeatures === undefined) {
            setErrorSelectFlagFeatures(true)
        } else if(selectedOption.length === 0) {
            setErrorSelect(true)
        } else {
            if(IdCapability === null) {
                let postData= {
                    name : data.name,
                    flag : selectedFlagFeatures.value,
                    capabilities: proceedToArray(selectedOption),
                }
                onCreateFeatures(postData)
                reset()
            } else {
                let updateData= {
                    name : data.name,
                    flag : selectedFlagFeatures.value,
                    capabilities: proceedToArray(selectedOption),
                    id: IdCapability
                }
                onUpdateFeatures(updateData)
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
            name: 'CAPABILITIES',
            cell: (row) => (
                <>
                    {
                        row.capabilities.map((value : any, index : any) => (
                            <p key={index}>{value}, </p>
                        ))
                    }
                </>
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
                            setIdCapability(row.id)
                            setSelectedOption(row.capabilities)
                            setTimeout(() => {
                                handleClickOpen()
                            }, 100);
                        }}
                    >
                        Update
                    </Button>
                    <Button onClick={() => onRemoveFeatures(row) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        onGetFeatures()
        onGetCapability()
        onGetConfigStatus()
        dispatch(fetchFlag())
        setSelectedOption([])
        // eslint-disable-next-line
    },  [features.create, features.update, features.remove]);

    /* istanbul ignore next */
    useEffect(() => {
        if(flag?.data) {
            setOptionsFlagFeatures(flag.data)
        }
    }, [flag]);

    /* istanbul ignore next */
    useEffect(() => {
        const proceedOptions = () => {
            let initialDataCapabilities = capabilities.data
            let initialDataConfigStatus = statusConfig.data

            let dataOptionsCapabilities = []
            let dataOptionsConfigStatus = []

            for(let element of initialDataCapabilities) {
                dataOptionsCapabilities.push({ value: element._id, label: element.name })
            }
            
            for(let valelement of initialDataConfigStatus) {
                dataOptionsConfigStatus.push({ value: valelement.id, label: valelement.name })
            }
            let concatArray = [...dataOptionsCapabilities, ...dataOptionsConfigStatus]
            setOptions(concatArray)
        }
        proceedOptions()
    }, [capabilities, statusConfig]);

    return (
        <div>
            <Box pb={2}>
                <BreadCrumbs
                    current="Features"
                    isPage={false}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <h2>Master Features</h2>
                <Button 
                    variant="contained" color="primary" size="small" 
                    onClick={() => {
                        handleClickOpen()
                        reset()
                    }}
                >
                    Create New Feature
                </Button> 
            </Stack>
            <Box pt={4}>
                <TableData 
                    columns={columns}
                    data={features?.data}
                    progressPending={features?.loading}
                />
            </Box>
            <Dialog 
                open={open} 
                fullWidth={true}
                maxWidth="sm"
                
            >
                <form onSubmit={handleSubmit(onSubmit)} >
                    <DialogTitle>Add New Feature</DialogTitle>
                    <div className="box-modal-create">
                        <TextField
                            /* istanbul ignore next */
                            error={!!errors.name}
                            /* istanbul ignore next */
                            helperText={errors.name && errors.name.message}
                            {...register('name')}
                            margin="normal"
                            size="small"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus 
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
                        <Box pt={2}>
                            <Select
                                placeholder="Select capabilities"
                                value={selectedOption}
                                isMulti={true}
                                options={options}
                                onChange={handleChange}
                            />
                            { 
                            /* istanbul ignore next */
                            errorSelect ? <div className="error-p"><p>Capability is required</p></div> : null }
                        </Box>
                    </div>
                    <DialogActions>
                        <Button onClick={handleClose} color="warning">Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )   
}

export default MasterFeatures
