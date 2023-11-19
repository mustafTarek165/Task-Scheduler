let pairs=document.getElementById("txtarea1");
let y=document.getElementById("sub");
function solve()
{

    let counts=0, indegree=new Array(),a=[],b=[];
    const v=new Map(),ids=new Map(),visited=new Map();//ids id=>string ,visited:string=>id
   let lines=pairs.value.split('\n');
    for(let j=0;j<lines.length;j++)
    {
        let num=lines[j].split(/-|,/);
        a.push(num);
    }
    for(let i=0;i<a.length;i++)
    {
        for(let j=0;j<a[i].length;j++)
        {
            if(a[i][j]!='')
            counts++;
        }
    }
    //validations
    if(counts%2!=0) 
    {
       
        createmsg("Error, You must enter values in pairs separated by - only ");
        return;
    }
//initializations
    for(let i=0;i<counts;i++)
    {
        indegree[i]=0;
        v.set(i,new Set());
        ids.set(i,[]);
    }
counts=0;
    for(let i=0;i<a.length;i++)
    {
        for(let j=0;j<a[i].length;j++)
        {
            visited.set(a[i][j].trim(),0);
            
        }
    }

    for(let i=0;i<a.length;i++)
    {
        for(let j=0;j<a[i].length;j++)
        {
            if(a[i][j]!='')
            {
                if(visited.get(a[i][j].trim())==0)
                {
                    counts++;
                       ids.set(counts,a[i][j].trim());
                       visited.set(a[i][j].trim(),counts);
    
                }
               b.push(visited.get(a[i][j].trim()));
            }
           
        }
    }
   for(let i=0 ;i< b.length-1;i+=2)
   {
    --b[i];
    --b[i+1];
let ch= v.get(b[i]);
let Found1=true;
for(let j of ch)
{
    if(j==b[i+1])
    {
        Found1=false;
        break;
    }
}
if(Found1)
{
    ch.add(b[i+1]);
    indegree[b[i+1]]++;
}
   }
   
   //Topolgical sort (Khan algorithm) 
    let q=[],cnt=0;
   
   for(let i=0;i<counts;i++)
   {
       if(indegree[i]==0)
       {
           q.push(i);
       }

   }

    let topo_order=[];
   while(q.length>0)
   {

    let u=q.shift();    
    topo_order.push(u+1);
    const xo=v.get(u);
    for(let i of xo)
    {
        if(--indegree[i]==0)
        {
            q.push(i);
        }
    }
    cnt++;
   }
   if(cnt!=counts) o.value="No Valid Sequence,this is contradictory information";
   else
{
   let original=[];
   for(let i =0;i<topo_order.length;i++)
   {
    original[i]=ids.get(topo_order[i])
   }
   if(original.length!=0)
   o.value=
   `
    (${original})
   `  
   else
   {
    createmsg("Enter your values");
   }
}
}
function createmsg(mssg)
{

    
        let div=document.createElement("div");
        let divtxt=document.createTextNode(mssg);
        div.appendChild(divtxt);
          div.className="checker";
          document.body.appendChild(div);         
}
 
//////on submit
 y.addEventListener("click",create);
function create()
{
///get the answer
solve();

}
