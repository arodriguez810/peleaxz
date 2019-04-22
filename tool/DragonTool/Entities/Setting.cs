using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TramsEIS.Entities
{
    public class ListPK<T> : List<T>
    {

        public event EventHandler OnAdd;
        public event EventHandler OnRemove;

        public void Add(T item)
        {
            base.Add(item);
            OnAdd?.Invoke(this, null);
        }
        public void Remove(T item)
        {
            base.Remove(item);
            OnRemove?.Invoke(this, null);
        }

    }
}
